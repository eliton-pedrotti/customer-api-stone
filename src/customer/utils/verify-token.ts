import { HttpException, HttpStatus } from "@nestjs/common";

export const verifyToken = (headers) => {
    const { authorization } = headers;
    if (!authorization) {
        throw new HttpException(`Missing authorization headers`, HttpStatus.FORBIDDEN);
    }
    const token = authorization.split(' ')[1];
    return token;
}