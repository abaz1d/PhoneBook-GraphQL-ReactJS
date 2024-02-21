# PhoneBook-GraphQL-Sequelize-ReactJS

## Introduction

This is a simple full stack React application which provides a solid starting point for [ExpressJS](https://expressjs.com/), [ReactJS](https://reactjs.org/), [NodeJS](https://nodejs.org/en/), and [Sequelize](https://sequelize.org/) based applications. Client side code is written in React and the backend API is written using Express and [GraphQL](https://graphql.org/).

A phonebook application is a book that contains names, addresses, and phone numbers of friends or anyone in a certain area. This app is built using React JS.

## Before You Begin

Before you begin i recommend you to read about the basic building blocks that assemble this application:
* Sequelize - Go through [Sequelize Official Website](https://sequelize.org/) and proceed to their [Official Manual](https://sequelize.org/), which should help you understand PostgreSQL and Sequelize better.
* GraphQL -  Go through [GraphQL Official Website](https://graphql.org/) and proceed to their [Official Manual](https://graphql.org/code/#javascrip), which should help you understand GraphQL better.
* Express - The best way to understand express is through it's [Official Website](https://expressjs.com/), which has a [Getting Started](https://expressjs.com/en/starter/installing.html) guide, as well as an [ExpressJS](https://expressjs.com/en/guide/routing.html) guide for general express topics.
* ReactJS - React's [Official Website](https://reactjs.org/) is a great starting point.
* Node.js - Start by going through [Node.js Official Website](https://nodejs.org/en/) which should get you going with the Node.js platform.

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
* Sequelize - [Download & Install Sequelize](https://sequelize.org/docs/v6/getting-started/), and make sure it's running on the default port (5432).

## front-end

 - ReactJS (ES6)
 - react-router (*Single Page Application*)
 - react hooks
 - bootstrap

*source files in `client/` folder.*
## back-end

 - NodeJS
 - ExpressJS
 - Sequelize
 - GraphQL

*source files in `backend/` folder*

## Quick Start

open terminal to run server,
*Please make sure your PostgreSQL is running*

```bash
# Clone the repository
git clone https://github.com/abaz1d/PhoneBook-GraphQL-ReactJS

# Go inside the directory
cd PhoneBook-GraphQL-ReactJS

# Install dependencies for server
cd backend && npm install

# Start server
npm start
```

open new terminal to run client

```bash
# Go inside the directory
cd PhoneBook-GraphQL-ReactJS

# Install dependencies for client
cd client && npm install

# Start client
npm start
```

this application should run on port 5173 , you can access it through browser, just go to [http://localhost:5173/](http://localhost:5173/) for Client Web App. and
[http://localhost:3000/](http://localhost:3000/) for RESTful APIs.

### Screenshots Client Web App

<img src="https://user-images.githubusercontent.com/95122515/200493784-a3f3f2c5-d327-4f4b-b79a-10284996ab1c.png" width="49%"> <img src="https://user-images.githubusercontent.com/95122515/200493817-513d1a40-33b9-4399-bd14-ce44d4bf4607.png" width="49%">
