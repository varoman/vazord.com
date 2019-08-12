# vazord.com
react/node/ application for [vazord.com](http://vazord.com/index.php?page=home_arm).

# Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes only.

### Prerequisites

First of all you will need node.js for running both client and backend applications. 
To download node.js go to [node.js website](https://nodejs.org/en/) and download LTS version version.


To check if you installed node.js simply run this command in you terminal window:
`node -v` which should output something like this `v10.16.0`.

NPM (node package manager) will be installed automatically as soon as you install node.js.
To check this run `npm -v` and you should see output similar this `6.9.0`


### Installing

There are two separate applications (client side and server side) there so you will have to install them one by one.

To install backend application follow these steps:

- install postgresql database (instructions on this can  be found [here](https://www.postgresql.org/download/))

- navigate to `vazord-backend` directory

- run `npm install` (this will install all project dependencies)

- run `nodemon` from `vazord-backend` directory to start the app

To install client side application follow these steps:

- navigate to `vazord-client` directory

- run `npm install`

- run `npm start` to start the app

This is it, you should be done.
