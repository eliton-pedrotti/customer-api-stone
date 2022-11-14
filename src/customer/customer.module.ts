import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [CustomerModule, AuthModule],
    controllers: [CustomerController],
    providers: [CustomerService, JwtService],
})
export class CustomerModule { }
