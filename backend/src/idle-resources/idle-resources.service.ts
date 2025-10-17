import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  IdleResource,
  IdleResourceStatus,
  ResourceSource,
} from '../entities/idle-resource.entity';
import { User, UserRole } from '../entities/user.entity';

export interface CreateIdleResourceDto {
  employeeId: string;
  employeeName: string;
  department: string;
  idleFromDate: Date;
  processNote?: string;
  rate: number;
  skills: string;
  source: ResourceSource;
  isUrgent: boolean;
  cvFilePath?: string;
  cvFileName?: string;
}

export interface UpdateIdleResourceDto {
  employeeId?: string;
  employeeName?: string;
  department?: string;
  idleFromDate?: Date;
  status?: IdleResourceStatus;
  processNote?: string;
  rate?: number;
  skills?: string;
  source?: ResourceSource;
  isUrgent?: boolean;
  cvFilePath?: string;
  cvFileName?: string;
}

export interface ResourceFilterDto {
  search?: string;
  department?: string;
  status?: IdleResourceStatus;
  source?: ResourceSource;
  isUrgent?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}

@Injectable()
export class IdleResourcesService {
  constructor(
    @InjectRepository(IdleResource)
    private resourceRepository: Repository<IdleResource>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(filters: ResourceFilterDto, currentUser: User) {
    const {
      search,
      department,
      status,
      source,
      isUrgent,
      dateFrom,
      dateTo,
      page = 1,
      limit = 10,
    } = filters;

    let query: SelectQueryBuilder<IdleResource> = this.resourceRepository
      .createQueryBuilder('resource')
      .leftJoinAndSelect('resource.createdBy', 'createdBy')
      .leftJoinAndSelect('resource.updatedBy', 'updatedBy');

    // Role-based filtering
    if (
      currentUser.role === UserRole.MANAGER ||
      currentUser.role === UserRole.VIEWER
    ) {
      query = query.where('resource.department = :userDepartment', {
        userDepartment: currentUser.department,
      });
    }

    // Apply filters
    if (search) {
      query = query.andWhere(
        '(resource.employeeName LIKE :search OR resource.employeeId LIKE :search OR resource.skills LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (department) {
      query = query.andWhere('resource.department = :department', {
        department,
      });
    }

    if (status) {
      query = query.andWhere('resource.status = :status', { status });
    }

    if (source) {
      query = query.andWhere('resource.source = :source', { source });
    }

    if (isUrgent !== undefined) {
      query = query.andWhere('resource.isUrgent = :isUrgent', { isUrgent });
    }

    if (dateFrom) {
      query = query.andWhere('resource.idleFromDate >= :dateFrom', {
        dateFrom,
      });
    }

    if (dateTo) {
      query = query.andWhere('resource.idleFromDate <= :dateTo', { dateTo });
    }

    // Pagination
    const offset = (page - 1) * limit;
    query = query.skip(offset).take(limit);

    // Order by created date desc
    query = query.orderBy('resource.createdAt', 'DESC');

    const [resources, total] = await query.getManyAndCount();

    return {
      data: resources,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number, currentUser: User): Promise<IdleResource> {
    const resource = await this.resourceRepository.findOne({
      where: { id },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!resource) {
      throw new NotFoundException(`Idle resource with ID ${id} not found`);
    }

    // Role-based access control
    if (
      (currentUser.role === UserRole.MANAGER ||
        currentUser.role === UserRole.VIEWER) &&
      resource.department !== currentUser.department
    ) {
      throw new ForbiddenException('Access denied to this resource');
    }

    return resource;
  }

  async create(
    createDto: CreateIdleResourceDto,
    currentUser: User,
  ): Promise<IdleResource> {
    // Only ADMIN and RA can create resources
    if (
      currentUser.role !== UserRole.ADMIN &&
      currentUser.role !== UserRole.RA
    ) {
      throw new ForbiddenException(
        'Only Admin and RA users can create resources',
      );
    }

    const resource = this.resourceRepository.create({
      ...createDto,
      status: IdleResourceStatus.OPEN,
      createdById: currentUser.id,
      updatedById: currentUser.id,
    });

    return this.resourceRepository.save(resource);
  }

  async update(
    id: number,
    updateDto: UpdateIdleResourceDto,
    currentUser: User,
  ): Promise<IdleResource> {
    const resource = await this.findOne(id, currentUser);

    // Only ADMIN and RA can update resources
    if (
      currentUser.role !== UserRole.ADMIN &&
      currentUser.role !== UserRole.RA
    ) {
      throw new ForbiddenException(
        'Only Admin and RA users can update resources',
      );
    }

    Object.assign(resource, updateDto);
    resource.updatedById = currentUser.id;
    resource.updatedAt = new Date();

    return this.resourceRepository.save(resource);
  }

  async remove(id: number, currentUser: User): Promise<void> {
    const resource = await this.findOne(id, currentUser);

    // Only ADMIN can delete resources
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only Admin users can delete resources');
    }

    await this.resourceRepository.remove(resource);
  }

  async getDashboardStats(currentUser: User) {
    let query = this.resourceRepository.createQueryBuilder('resource');

    // Role-based filtering
    if (
      currentUser.role === UserRole.MANAGER ||
      currentUser.role === UserRole.VIEWER
    ) {
      query = query.where('resource.department = :userDepartment', {
        userDepartment: currentUser.department,
      });
    }

    const [
      totalResources,
      openResources,
      inProgressResources,
      closedResources,
      urgentResources,
    ] = await Promise.all([
      query.getCount(),
      query
        .clone()
        .andWhere('resource.status = :status', {
          status: IdleResourceStatus.OPEN,
        })
        .getCount(),
      query
        .clone()
        .andWhere('resource.status = :status', {
          status: IdleResourceStatus.IN_PROGRESS,
        })
        .getCount(),
      query
        .clone()
        .andWhere('resource.status = :status', {
          status: IdleResourceStatus.CLOSED,
        })
        .getCount(),
      query
        .clone()
        .andWhere('resource.isUrgent = :isUrgent', { isUrgent: true })
        .getCount(),
    ]);

    // Department breakdown
    const departmentStats = await this.resourceRepository
      .createQueryBuilder('resource')
      .select('resource.department', 'department')
      .addSelect('COUNT(*)', 'count')
      .groupBy('resource.department')
      .getRawMany();

    // Status breakdown by month (last 6 months)
    const monthlyStats = await this.resourceRepository
      .createQueryBuilder('resource')
      .select('DATE_FORMAT(resource.createdAt, "%Y-%m")', 'month')
      .addSelect('resource.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('resource.createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)')
      .groupBy('month, resource.status')
      .orderBy('month', 'ASC')
      .getRawMany();

    return {
      overview: {
        totalResources,
        openResources,
        inProgressResources,
        closedResources,
        urgentResources,
      },
      departmentStats,
      monthlyStats,
    };
  }
}
