import { IdleResourcesService, CreateIdleResourceDto, UpdateIdleResourceDto, ResourceFilterDto } from './idle-resources.service';
export declare class IdleResourcesController {
    private readonly idleResourcesService;
    constructor(idleResourcesService: IdleResourcesService);
    create(createDto: CreateIdleResourceDto, req: any): Promise<import("../entities/idle-resource.entity").IdleResource>;
    findAll(filters: ResourceFilterDto, req: any): Promise<{
        data: import("../entities/idle-resource.entity").IdleResource[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getDashboardStats(req: any): Promise<{
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
    findOne(id: string, req: any): Promise<import("../entities/idle-resource.entity").IdleResource>;
    update(id: string, updateDto: UpdateIdleResourceDto, req: any): Promise<import("../entities/idle-resource.entity").IdleResource>;
    remove(id: string, req: any): Promise<void>;
}
