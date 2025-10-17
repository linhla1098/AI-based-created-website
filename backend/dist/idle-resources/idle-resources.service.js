"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdleResourcesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const idle_resource_entity_1 = require("../entities/idle-resource.entity");
const user_entity_1 = require("../entities/user.entity");
let IdleResourcesService = class IdleResourcesService {
    constructor(resourceRepository, userRepository) {
        this.resourceRepository = resourceRepository;
        this.userRepository = userRepository;
    }
    async findAll(filters, currentUser) {
        const { search, department, status, source, isUrgent, dateFrom, dateTo, page = 1, limit = 10, } = filters;
        let query = this.resourceRepository
            .createQueryBuilder('resource')
            .leftJoinAndSelect('resource.createdBy', 'createdBy')
            .leftJoinAndSelect('resource.updatedBy', 'updatedBy');
        if (currentUser.role === user_entity_1.UserRole.MANAGER ||
            currentUser.role === user_entity_1.UserRole.VIEWER) {
            query = query.where('resource.department = :userDepartment', {
                userDepartment: currentUser.department,
            });
        }
        if (search) {
            query = query.andWhere('(resource.employeeName LIKE :search OR resource.employeeId LIKE :search OR resource.skills LIKE :search)', { search: `%${search}%` });
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
        const offset = (page - 1) * limit;
        query = query.skip(offset).take(limit);
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
    async findOne(id, currentUser) {
        const resource = await this.resourceRepository.findOne({
            where: { id },
            relations: ['createdBy', 'updatedBy'],
        });
        if (!resource) {
            throw new common_1.NotFoundException(`Idle resource with ID ${id} not found`);
        }
        if ((currentUser.role === user_entity_1.UserRole.MANAGER ||
            currentUser.role === user_entity_1.UserRole.VIEWER) &&
            resource.department !== currentUser.department) {
            throw new common_1.ForbiddenException('Access denied to this resource');
        }
        return resource;
    }
    async create(createDto, currentUser) {
        if (currentUser.role !== user_entity_1.UserRole.ADMIN &&
            currentUser.role !== user_entity_1.UserRole.RA) {
            throw new common_1.ForbiddenException('Only Admin and RA users can create resources');
        }
        const resource = this.resourceRepository.create({
            ...createDto,
            status: idle_resource_entity_1.IdleResourceStatus.OPEN,
            createdById: currentUser.id,
            updatedById: currentUser.id,
        });
        return this.resourceRepository.save(resource);
    }
    async update(id, updateDto, currentUser) {
        const resource = await this.findOne(id, currentUser);
        if (currentUser.role !== user_entity_1.UserRole.ADMIN &&
            currentUser.role !== user_entity_1.UserRole.RA) {
            throw new common_1.ForbiddenException('Only Admin and RA users can update resources');
        }
        Object.assign(resource, updateDto);
        resource.updatedById = currentUser.id;
        resource.updatedAt = new Date();
        return this.resourceRepository.save(resource);
    }
    async remove(id, currentUser) {
        const resource = await this.findOne(id, currentUser);
        if (currentUser.role !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Only Admin users can delete resources');
        }
        await this.resourceRepository.remove(resource);
    }
    async getDashboardStats(currentUser) {
        let query = this.resourceRepository.createQueryBuilder('resource');
        if (currentUser.role === user_entity_1.UserRole.MANAGER ||
            currentUser.role === user_entity_1.UserRole.VIEWER) {
            query = query.where('resource.department = :userDepartment', {
                userDepartment: currentUser.department,
            });
        }
        const [totalResources, openResources, inProgressResources, closedResources, urgentResources,] = await Promise.all([
            query.getCount(),
            query
                .clone()
                .andWhere('resource.status = :status', {
                status: idle_resource_entity_1.IdleResourceStatus.OPEN,
            })
                .getCount(),
            query
                .clone()
                .andWhere('resource.status = :status', {
                status: idle_resource_entity_1.IdleResourceStatus.IN_PROGRESS,
            })
                .getCount(),
            query
                .clone()
                .andWhere('resource.status = :status', {
                status: idle_resource_entity_1.IdleResourceStatus.CLOSED,
            })
                .getCount(),
            query
                .clone()
                .andWhere('resource.isUrgent = :isUrgent', { isUrgent: true })
                .getCount(),
        ]);
        const departmentStats = await this.resourceRepository
            .createQueryBuilder('resource')
            .select('resource.department', 'department')
            .addSelect('COUNT(*)', 'count')
            .groupBy('resource.department')
            .getRawMany();
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
};
exports.IdleResourcesService = IdleResourcesService;
exports.IdleResourcesService = IdleResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(idle_resource_entity_1.IdleResource)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], IdleResourcesService);
//# sourceMappingURL=idle-resources.service.js.map