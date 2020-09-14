# Nodejs Express MongoDB REST API backend 

![Github build](https://img.shields.io/github/workflow/status/nirmal1064/todo-rest-api/Node.js%20CI)
![Github repo size](https://img.shields.io/github/repo-size/nirmal1064/todo-rest-api)
![Github downloads](https://img.shields.io/github/downloads/nirmal1064/todo-rest-api/total)


This is the backend REST API for the [TODO App](https://github.com/nirmal1064/todo-app-react). This API is built using `Node`, `Express` and `Mongoose` frameworks and deployed in [Heroku](https://www.heroku.com/) and the frontend is deployed in [Netlify](https://todolist-mern.netlify.app/)

---
## Running Project in DEV Environment

### Requirements

For development, you need to have [Git](https://git-scm.com/) [Node JS](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your local machine either [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) package manager of your choice

### Node and Mongodb
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node -v
    v14.5.0

    $ npm -v
    6.14.8

- #### Mongodb Installation
  Mongodb installation steps can be found in the [official MongoDB website](https://docs.mongodb.com/manual/installation/)


To update npm to its latest version run the follow command

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Setting up the project

    $ git clone https://github.com/nirmal1064/todo-rest-api
    $ cd todo-rest-api
    $ yarn install
    or if you use npm
    $ npm install

## Configuring the project

Create a `.env` file in the root directory of the project and copy the contents of `.env.example` to `.env` and replace the values accordingly

The `.env` is ignored, so you never commit any sensitive information and it remains only in your local machine


## Running the project

Once the above steps are completed we can start the api.

    $ mongod     # to start the local mongodb instance
    $ yarn dev   # to start the api in dev mode

## Testing the project

    $ yarn test # to run the test cases
    $ yarn test:watch # to run the test cases in interactive mode


That's All! Feel free to raise an issue if anything goes wrong.

## Future Goals

    1. Add User authentication for creating personalized TODOs
    2. Increasing code converage

