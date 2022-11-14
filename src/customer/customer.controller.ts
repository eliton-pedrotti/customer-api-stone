import { Body, Controller, Get, Param, Post, Put, Headers, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from './customer.service';
import { Customer, CustomerResponse, DecodedJWT } from './types/customer';
import { verifyToken } from './utils/verify-token';

@Injectable()
@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerService,
        private readonly jwtService: JwtService) { }

    @Post()
    public createCustomer(@Body() req: Customer, @Headers() headers): Promise<Customer> {
        try {
            const token = verifyToken(headers);
            this.jwtService.decode(token) as DecodedJWT;
            return this.customerService.createCustomer(req);
        } catch (error) {
            if (error?.message.includes('Unexpected token')) {
                throw new HttpException(`Invalid token`, HttpStatus.FORBIDDEN);
            }
            return error;
        }
    }

    @Get(':customerId')
    public findCustomer(@Param('customerId') customerId: string, @Headers() headers): Promise<CustomerResponse> {
        try {
            const token = verifyToken(headers);
            this.jwtService.decode(token) as DecodedJWT;
            return this.customerService.findCustomer(customerId);
        } catch (error) {
            if (error?.message.includes('Unexpected token')) {
                throw new HttpException(`Invalid token`, HttpStatus.FORBIDDEN);
            }
            return error;
        }
    }

    @Put(':customerId')
    public updateCustomer(
        @Param('customerId') customerId: string,
        @Body() req: Customer, @Headers() headers): Promise<CustomerResponse> {
        try {
            const token = verifyToken(headers);
            this.jwtService.decode(token) as DecodedJWT;
            return this.customerService.updateCustomer(customerId, req);
        } catch (error) {
            if (error?.message.includes('Unexpected token')) {
                throw new HttpException(`Invalid token`, HttpStatus.FORBIDDEN);
            }
            return error;
        }
    }
}
