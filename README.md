# Calculator App

This is a calculator app built using React, Node.js and ant.design for the data table impl.
It allows users to perform arithmetic and non arithmetic operations and view calculation records.
Remote version of Calculator App UI is deployed at:
https://calculator-client-production.up.railway.app/


## Features
- Login
- Logout
- Arithmetic operations (addition, subtraction, multiplication, division, square root)
- Non-arithmetic operations (generate random string)
- Data Table (ant.design) with pagination, paginations size config, filtering, search and ordering. Just click the magnifiying or arrows buttons.
- Delete Operation Record

## Prerequisites

- Docker
- NodeJS (for a faster development feedback maybe you don't want to run the app in a conteiner)
- Calculator API running (https://github.com/jotapemoraez/calculator-api)


## User test credentials for local and remote env
```shell
username: test@test.com
password: @11aa
```

## Production Environment
- The App is running at https://calculator-client-production.up.railway.app/

## Getting Started in your local environment

To run the Calculator app using Docker, follow these steps:

1. Clone this repository to your local machine:

   ```shell
   git clone git@github.com:jp-flex/calculator-client.git
   ```
2. Navigate to the project directory:
    ```shell
    cd calculator-app
    ```
3. Build and run the docker image:
    docker-compose up -d  --build

4. The app should be up and running at http://localhost:3000


## Getting Started in your local environment without docker

1. Install Node
2. create env REACT_APP_HOST with http://localhost:3001

2. npm install
3. npm start
4. The app should be up and running at http://localhost:3000

## Run Tests
- with docker:
  ```shell
   the app conteiner should be running
   call: docker exec -it calculator-client npm test
  ```
- without docker:
     ```shell
   npm install
   npm test
  ```

## Tech Debts
- Create unit test for NewOperation and Records component
    - For some reason it was not possible to mock the operands inputs for ant.design component. Even by Testing Playground it was not possible to find them.
