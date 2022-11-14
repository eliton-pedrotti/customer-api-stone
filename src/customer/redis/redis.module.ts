import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { PREFIX } from '../constants/constants';

@Module({
    imports: [
        RedisModule.forRootAsync({
            useFactory: () => ({
                config: {
                    port: 6379,
                    host: "localhost",
                    keyPrefix: PREFIX
                },
            }),
        }),
    ],
})
export class RedisModuleConfig { }