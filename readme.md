# Skeleton to node with typescript

The architecture defined for the backend consists of defining a set of folders and files for better organization.

- config
  - responsible folder for storing various system settings.
- database
  - responsible for storing database configurations, migrations, seeders.
- errors
  - customizable errors to be used in the application when it is necessary to throw exceptions
- middlewares
  - application interceptors for data validation, security, route authentication.
- modules
  - stores all the application's business rules and each entity in the database will have a specific folder containing
    all its business rules.
- server
  - stores files responsible for the initialization and configuration of the rest full api
- shared
  - stores libraries, functions, auxiliary classes for every project.
- swagger
  - documentation of every api, when creating a route the documentation should be added.
- utils
  - stores useful functions and classes for system use.

# Technology Uses

- NodeJs [https://nodejs.org/en/](https://nodejs.org/en/)
- Typescript [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- Express [https://github.com/expressjs/express](https://github.com/expressjs/express)
- ORM Sequelize [https://sequelize.org/](https://sequelize.org/)
- Jest testing [https://jestjs.io/pt-BR/](https://jestjs.io/pt-BR/)
- Docker and Docker-Compose [https://www.docker.com/](https://www.docker.com/)
  - Nginx [https://www.nginx.com/](https://www.nginx.com/)
  - Postgresql [https://www.postgresql.org/](https://www.postgresql.org/)
  - Redis [https://redis.io/](https://redis.io/)
  - Mysql [https://www.mysql.com/](https://www.mysql.com/)
  - Maria DB [https://mariadb.org/](https://mariadb.org/)
- Kubernetes [https://kubernetes.io/](https://kubernetes.io/)
- and other auxiliaries...

# Run Project

It is necessary to have docker and docker-compose installed on your machine, and for that you just access
the [official documentation](https://docs.docker.com/engine/install/) for installation and select your operating system,
after that just run the commands below.

```shell
# clone project and turn on server
git clone git@github.com:vcwebnetworks/nodejs-skeleton.git -b develop
cd nodejs-skeleton
yarn dev:docker --build -d

# access server bash and run migrations and seeders
docker exec -it node.app bash
yarn db:migrate
yarn db:seed
```

after step up your server will be online on host [http://localhost](http://localhost)
