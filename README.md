## Requisitos

- Docker 20
- Node.js v14.20
- OBS: É necessário ter o docker instalado.

## Como executar localmente?

1. Basta rodar o comando abaixo, e entao as dependencias, a imagem do Redis via docker compose, e o start da API iniciarão

```bash
npm run start
```

2. Para efetuar chamadas aos endpoints, basta importar a collection disponível na raiz do projeto.

3. Fluxo:

- Primeiramente é necessário autenticar-se, através da request ```Auth```, feito isso, basta copiar o token recebido, e passar no header ```Authorization``` das demais requests, Ex: ```Bearer...```.
- Exemplos de payloads e ids, estão todos na collection importada.
- Software utilizado para efetuar as chamadas [postman](https://www.postman.com/)