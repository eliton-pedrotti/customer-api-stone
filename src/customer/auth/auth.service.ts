import { Injectable } from '@nestjs/common';
import { stringify } from 'qs';
import { Axios } from '../http/client';

@Injectable()
export class AuthService {
    constructor(private readonly axiosService: Axios) { }

    private readonly BASE_SSO_URL: string = 'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token';

    public async getToken(username: string) {

        const passwordBase64 = Buffer.from(username).toString('base64');

        const bodyEncoded = stringify({
            grant_type: 'client_credentials',
            client_id: 'customers',
            client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
            username: username,
            password: passwordBase64,
            scope: 'openid'
        })

        const config = {
            method: 'post',
            url: this.BASE_SSO_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: bodyEncoded
        };

        const response = await this.axiosService.post(config);
        return {
            access_token: response.data.access_token
        };
    }
}
