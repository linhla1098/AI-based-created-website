import { User } from './user.entity';
export declare enum IdleResourceStatus {
    OPEN = "Open",
    IN_PROGRESS = "In Progress",
    CLOSED = "Closed"
}
export declare enum ResourceSource {
    INTERNAL = "Internal",
    EXTERNAL = "External",
    REFERRAL = "Referral"
}
export declare class IdleResource {
    id: number;
    employeeId: string;
    employeeName: string;
    department: string;
    idleFromDate: Date;
    status: IdleResourceStatus;
    processNote: string;
    rate: number;
    skills: string;
    source: ResourceSource;
    isUrgent: boolean;
    cvFilePath: string;
    cvFileName: string;
    createdBy: User;
    createdById: number;
    updatedBy: User;
    updatedById: number;
    createdAt: Date;
    updatedAt: Date;
}
