# ExpressReact

## Frontend

To setup frotnend of the application:

```
cd Client
npm install
npm run dev
```

Access the frontend at

http://localhost:5173/

## Backend

To setup the backend of the application

Download and install [Postgres](https://www.postgresql.org/download/) and setup postgres user and password

After installing Postgres:

```
cd Server
```

create a `.env` file with the following details

```
DATABASE_URL="postgresql://<user>:<password>@<server address>:<port number>/<Database Name>"
PORT=8000
HOST=localhost
JWT_SECRET=<your JWT secret>
```

example .env configuration

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ExpressReact"
PORT=8000
HOST=localhost
JWT_SECRET='QWERUJIOFSDJKLA;FSDA'
```

after env configuration run the following commands

```
npm install
npx prisma init
npx prisma migrate dev --name initialMigration
npx prisma generate
npm run start:dev
```

Access the backend at

http://localhost:8000/
