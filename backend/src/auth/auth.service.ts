import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  department: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    console.log('🔍 Validating user:', username);
    
    const user = await this.userRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'password',
        'role',
        'department',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user) {
      console.log('❌ User not found:', username);
      return null;
    }

    console.log('👤 User found:', user.username);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Password valid:', isPasswordValid);

    if (user && isPasswordValid) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    console.log('🔐 Login attempt for username:', username);
    
    const user = await this.validateUser(username, password);

    if (!user) {
      console.log('❌ Invalid credentials for username:', username);
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('✅ Login successful for user:', user.username);

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      department: user.department,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        department: user.department,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'username',
        'role',
        'department',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
