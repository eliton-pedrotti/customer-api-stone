import { CustomerService } from "../src/customer/customer.service";
import Redis from 'ioredis';
import { createCustomerBody, findCustomerResponse, updateCustomer, updateCustomerError } from "./mocks/body-mocks";
import { Customer, CustomerResponse } from "src/customer/types/customer";

describe('customer', () => {

    const redis = new Redis();
    const customerService = new CustomerService(redis);

    beforeEach(() => {

        jest.spyOn(redis, 'set').mockImplementation((): any => {
            return Promise.resolve({
                key: "customer:ca67be46-a3ea-4047-9e2a-ebc10f830cfa",
                value: `{"id":"ca67be46-a3ea-4047-9e2a-ebc10f830cfa","document":"376478236678","name":"Mercado Coma Bem LTDA"}`
            })
        });

        jest.spyOn(redis, 'get').mockImplementation((customerId: string): any => {
            if (customerId === "ca67be46-a3ea-4047-9e2a-ebc10f830cfa") {
                return Promise.resolve(`{"id":"ca67be46-a3ea-4047-9e2a-ebc10f830cfa","document":"376478236678","name":"Mercado Coma Bem LTDA"}`)

            } else if (customerId === "ca67be46-a3ea-4047-9e2a-ebc10f830cfa2") {
                return Promise.resolve(`{"id":"ca67be46-a3ea-4047-9e2a-ebc10f830cfa2","document":"376478236678","name":"Mercado Coma Bem LTDA Atualizado"}`)
            }
            else {
                return Promise.resolve(null)
            }
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('Deve efetuar a criacao do customer com sucesso', async () => {
        const res = await customerService.createCustomer(
            {
                document: 376478236678,
                name: "Mercado Coma Bem LTDA"
            }
        )
        expect(res.document).toEqual(createCustomerBody.document);
        expect(res.name).toEqual(createCustomerBody.name);
    });

    test('Deve efetuar a busca do customer com sucesso', async () => {
        const id = "ca67be46-a3ea-4047-9e2a-ebc10f830cfa";
        const res = await customerService.findCustomer(id);
        expect(res).toEqual(findCustomerResponse);
    });

    test('Deve efetuar o update do customer com sucesso', async () => {

        const id = "ca67be46-a3ea-4047-9e2a-ebc10f830cfa2";
        const res = await customerService.updateCustomer(id, {
            document: 376478236678,
            name: "Mercado Coma Bem LTDA Atualizado"
        });

        expect(res).toEqual(updateCustomer);
    });

    test('Deve devolver um erro ao buscar um customer inexistente', async () => {
        try {
            const id = "ca67be46-a3ea-4047-9e2a-ebc10f830cfa87777";
            const res = await customerService.findCustomer(id);

            expect(res).toEqual(updateCustomerError);
        } catch (error) {
            expect(error.status).toBe(404);
            expect(error.response).toEqual(updateCustomerError.message);
        }
    });

    test('Deve devolver um erro ao atualizar um customer inexistente', async () => {
        try {
            const id = "ca67be46-a3ea-4047-9e2a-ebc10f830cfa87777";
            const res = await customerService.updateCustomer(id,
                {
                    document: 376478236678,
                    name: "Mercado Coma Bem LTDA Atualizado 2"
                });

            expect(res).toEqual(updateCustomerError);
        } catch (error) {
            expect(error.status).toBe(404);
            expect(error.response).toEqual(updateCustomerError.message);
        }
    });
});