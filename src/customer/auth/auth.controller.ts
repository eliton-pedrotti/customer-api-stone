import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    public auth(@Body() req) {
        return this.authService.getToken(req.username);
    }
}
