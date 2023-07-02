# Calculator App

This is a calculator app built using React and Node.js. 
It allows users to perform arithmetic and non arithmetic operations and view calculation records.

## Prerequisites

- Docker
- NodeJS (for a faster development feedback maybe you don't want to run the app in a conteiner)
- Calculator API running (https://github.com/jotapemoraez/calculator-api)

## Getting Started in your local environment

To run the Calculator app using Docker, follow these steps:

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/your-username/calculator-app.git
   ```
2. Navigate to the project directory:
    ```shell
    cd calculator-app
    ```
3. Build and run the docker image:
    docker-compose up -d  --build

4. The app should be up and running at http://localhost:3000