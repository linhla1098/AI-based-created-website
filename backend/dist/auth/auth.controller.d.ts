import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): any;
}
