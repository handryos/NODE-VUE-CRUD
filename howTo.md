Primeiro é necessário instalar o Postgres, e verificar no .env se as credenciais do Postgres estão corretas, principalmente a senha do banco e o ip que se direciona, principalmente em:

PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_PORT=5432

Após isso entre via cli na pasta server e client/front e de um npm install para instalar as dependências.

Após isso, crie dois terminais e rode o projeto com um "npm run dev", no client side é necessário entrar na pasta "front"

Quando dentro da pasta "baseproject", basta dar o comando cd client, cd + tab e rodar
Para o server basta dar cd server e rodar o npm run dev

Para os testes, recomendo que cadastre alguns dados tanto pelo postman quanto pelo front mesmo após rodar tudo, pois não foram mockados os dados.

Para roda-los, basta entrar na pasta __tests__ e rodar um npm tests

É esperado que do front seja rodada em uma máquina com resolução 1920 x 1080, pois não há suporte de responsividade para todos os sistemas.
