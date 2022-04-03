
# RootSecret : Personal Password Manager

This password manager was developed as a personal project, designed to keep password management away from dependence on third parties.

Anyone with the necessary knowledge can clone this repository, set up and configure their own password manager through a web interface.



## Tech Stack

**Client:** Nextjs(React), Typescript, TaildwindCss,   

**Server:** Nextjs, Postgresql, Prisma ORM.


## Installation

First, you need to clone the repository and install the dependencies:

```bash
  git clone https://github.com/rootspyro/RootSecret.git
  cd RootSecret/
  npm install
```


    
## Database

You will need to create a PostgreSQL database where the user data and passwords will be stored.  

* ### Install the postgresql database server
```bash
    sudo apt update
    sudo apt install postgresql postgresql-contrib 
```

* ### Quick Start Setup

  You will have to configure the user, password and database for the connection and storage of the project.

  [Postgresql Setup Guide.](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04-es#paso-1-instalar-postgresql)

  **IMPORTANT** : *The creation of tables will be done using Prisma.* 
  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


```bash

#PG DATABASE CONNECTION
PG_HOST="postgresql://user:password@localhost:5432/DBNAME?schema=public"

# RANDOM KEY GENERATION
JWT_SECRET= execute "openssl rand -base64 32" command 

# A 32 BITs SECRET KEY
CRYPTO_SECRET="Generate a 32bits secret key"

```
You may also follow this example in the [.env.example](.env.example) file.

For the connection with Postgresql, Prisma handles it by means of a URL with the credentials, where you indicate User, Password, Database name and Host.

**Example**: 

- Username : psql
- Password : adminpasswd
- DB : RootSecret
- Schema : public ( Default )
- Host : localhost
- Port : 5432 ( Default port )

**Then**:

```bash
PG_HOST="postgresql://psql:adminpasswd@localhost:5432/RootSecret?schema=public" 
```
## Run Locally

Now it is time to run the project.

- ### Let's prepare our database

    ```bash
    npx prisma generate
    npx prisma db push
    ```

    You can check the database setup from Prisma studio.
    
    ```bash
    npx prisma studio
    ```

- ### Run the server

    Dev Mode:
    ```bash
    npm run dev
    ```

    Production Mode:
    ```bash
    npm run build
    npm run start
    ```


## Authors

- [@rootspyro](https://www.github.com/rootspyro)


## License

[MIT](https://choosealicense.com/licenses/mit/)


