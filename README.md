<div align="center">
  <a href="https://github.com/Klonnister/interiano">
    <img src="./public/interiano-logo-shadowed.svg"/>
  </a>
</div>

<h1 align="center">Interiano (Product API)</h1>

A server in charge of storing product data for a small company or an entrepeneur. All information is stored in a database and files are served in the public directory.

Interiano api currently accepts just one user.

## Frameworks and ORM

<ul>
  <li>
    <a href="https://nestjs.com/" target="_blank">
      Nestjs &nbsp;<img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/NestJS.svg" width="18" height="18">
    </a>
  </li>
  <li>
    <a href="https://www.prisma.io/" target="_blank">
      Prisma.io &nbsp;<img src="https://i.pinimg.com/originals/39/b2/e4/39b2e4ad77c23a2c11e5950a7dfa2aec.png" width="15" height="15">
    </a>
  </li>
</ul>

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