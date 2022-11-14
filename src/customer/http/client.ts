import { HttpService, HttpModuleOptions } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Axios {
    constructor(private readonly httpService: HttpService) { }

    public async post(config?: HttpModuleOptions) {
        return await this.httpService.axiosRef.request(config);
    }
}