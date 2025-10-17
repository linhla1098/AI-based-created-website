import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';
export interface JwtPayload {
    sub: number;
    username: string;
    role: string;
    department: string;
}
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            username: string;
            role: import("../entities/user.entity").UserRole;
            department: string;
            createdAt: string;
            updatedAt: string;
        };
    }>;
    getUserById(id: number): Promise<User | null>;
}
