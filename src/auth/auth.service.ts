import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entity/user/user.entity';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(
        email: string,
        password: string,
    ): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usersService.create(email, hashedPassword);

        const { password: _, ...result } = user;
        return result;
    }

    async login(
        email: string,
        password: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
