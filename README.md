<div align="center">
  <img src="./public/interiano-logo-shadowed.svg"/>
</div>

<h1 align="center">Interiano (Product API)</h1>

A server in charge of storing product data for a small company or an entrepeneur. All information is stored in a database and files are served in the public directory.

Interiano api currently accepts just one user.

## Frameworks and ORM

- <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg" width="15" height="15"> &nbsp;Nestjs
- <img src="https://www.svgrepo.com/show/373776/light-prisma.svg" width="10" height="15"> &nbsp;Prisma.io


## Installation

```bash
$ npm install
```

## Create .env 

Create your .env file where the database host url will be specified according to [prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-mysql).

```js
DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb"
```

## Create constant

Create a folder named "constants" inside the auth module folder and create a file named "jwt.constant.ts"

Then, place your secret password inside the file:

```js
export const jwtConstants = {
  secret: 'your secret word goes here',
};
```

You can further configure the Jwt module inside the auth module (auth.module.ts). 


## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Author

Dennis Herrera

- Github - [Klonnister](https://github.com/klonnister)
- Instagram - [dennis_herrera_f](https://www.instagram.com/dennis_herrera_f/)

## Collaborators

- [Darin Funes](https://github.com/DarinFunes)
- [Cristian López](https://github.com/CristianBlake)