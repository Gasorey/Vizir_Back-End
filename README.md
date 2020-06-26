# Vizir_Back-End

<h2>Rodando a aplicação</h2>
<p>Para conseguir executar a aplicação na sua máquina, faça o clone do repositório</p>
<p>Dentro da pasta do projeto com ele aberto no seu terminal/IDE, execute o comando "yarn"</p>
<p>Crie uma imagem postgress no docker com o comando</p>

```
docker run --name vizir -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

```
<p>Para criar o banco de dados utilize o gerenciador da sua preferencia, minha recomendação é o DBeaver ele precisará ter o nome de Vizir</p>

<p>em seguida execute o comando para rodar as migrations </p>

  ````
  yarn typeorm migration:run
 ````

<p>na pasta raíz do projeto crie o arquivo ".env"</p>
<p>dentro do arquivo ".env" adicione uma sequencia de caracteres randomicos para usar de base para o JWT</p>



<h2>Testes</h2>

````
<p>yarn test</p>
````

<h2>Subir servidor com live-reload</h2>

````
yarn dev:server
````

<h2> Build</h2>

````
yarn build
````

<h2>Rotas</h2>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/e5dad1fd7cb9b9779194)


