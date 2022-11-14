import { InjectRedis } from '@nestjs-modules/ioredis';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Customer, CustomerResponse } from './types/customer';
import { v4 as uuidv4 } from 'uuid';
import { PREFIX } from './constants/constants';

@Injectable()
export class CustomerService {
    constructor(@InjectRedis() private readonly redis: Redis) { }

    public async createCustomer(customer: Customer): Promise<Customer> {
        const id = uuidv4();
        const buildCustomer = { id, ...customer };
        this.redis.set(id, JSON.stringify(buildCustomer));
        return buildCustomer;
    }

    public async findCustomer(customerId: string): Promise<CustomerResponse> {
        const customer = await this.redis.get(customerId);

        if (!customer) {
            throw new HttpException(`Customer with id ${customerId} not exists.`, HttpStatus.NOT_FOUND);
        }

        const formatCustomer: Customer = JSON.parse(customer);

        return {
            redisKey: `${PREFIX}${customerId}`,
            ...formatCustomer
        }
    }

    public async updateCustomer(customerId: string, req: Customer): Promise<CustomerResponse> {
        const customer = await this.redis.get(customerId);

        if (!customer) {
            throw new HttpException(`Customer with id ${customerId} not exists.`, HttpStatus.NOT_FOUND);
        }

        const customerUpdated = {
            id: customerId,
            document: req.document,
            name: req.name,
        }

        this.redis.set(customerId, JSON.stringify(customerUpdated));

        return {
            redisKey: `${PREFIX}${customerId}`,
            ...customerUpdated
        };
    }
}
