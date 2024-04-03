# Interiano (product API).

## Description
This is a server in charge of managing product inventory for a small company or an entrepeneur. It currently only accepts one user (admin).


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
  secret: 'spott',
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

- Github - [Klonnister](https://github.com/klonnister)
- Instagram - [dennis_herrera_f](https://www.instagram.com/dennis_herrera_f/)
