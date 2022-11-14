import { Module } from '@nestjs/common';
import { AuthModule } from './customer/auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { Axios } from './customer/http/client';
import { RedisModuleConfig } from './customer/redis/redis.module';

@Module({
  imports: [
    CustomerModule,
    AuthModule,
    RedisModuleConfig,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }