export declare enum UserRole {
    ADMIN = "admin",
    RA = "ra",
    MANAGER = "manager",
    VIEWER = "viewer"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
    department: string;
    createdAt: Date;
    updatedAt: Date;
}
