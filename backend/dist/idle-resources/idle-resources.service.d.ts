import { Repository } from 'typeorm';
import { IdleResource, IdleResourceStatus, ResourceSource } from '../entities/idle-resource.entity';
import { User } from '../entities/user.entity';
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
export declare class IdleResourcesService {
    private resourceRepository;
    private userRepository;
    constructor(resourceRepository: Repository<IdleResource>, userRepository: Repository<User>);
    findAll(filters: ResourceFilterDto, currentUser: User): Promise<{
        data: IdleResource[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number, currentUser: User): Promise<IdleResource>;
    create(createDto: CreateIdleResourceDto, currentUser: User): Promise<IdleResource>;
    update(id: number, updateDto: UpdateIdleResourceDto, currentUser: User): Promise<IdleResource>;
    remove(id: number, currentUser: User): Promise<void>;
    getDashboardStats(currentUser: User): Promise<{
        overview: {
            totalResources: number;
            openResources: number;
            inProgressResources: number;
            closedResources: number;
            urgentResources: number;
        };
        departmentStats: any[];
        monthlyStats: any[];
    }>;
}
