
export type Customer = {
    document: number;
    name: string;
}

export type CustomerResponse = {
    redisKey: string,
    id?: string,
    document: number,
    name: string
}

export type DecodedJWT = {
    exp: number;
}