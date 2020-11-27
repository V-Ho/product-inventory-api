# IKEA API Inventory App


----
## Table of contents
* [Introduction](#introduction)
* [Prerequistes](#prerequiste)
* [Installation](#installation)
* [Documentation](#documentation)
* [License](#license)

## Introduction
This project is a simulation of a simple backend for a store's inventory and product offerings. The project contains inventory and product files, and a RESTful API that queries entries in the files.

Project considerations include:
- **Simplicity and Maintainability**: separation of concerns for project in 3 main layers 
  - server: retrieves responses for necessary RESTful API endpoints 
  - controller: each function carries out use case for application's business logic
  - data: functions interact with and transform data from db (json files)
- **Readability**: 
  - files, variables and functions have names reflecting their purpose
- **Testability**:
  - proper error handling and logging (although could be more comprehensive and still needs testing suite)

## Prerequisites
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) 
- Postman - Download and Install [Postman](https://www.getpostman.com/downloads) - Implementation with postman latest version.


## Installation
### Clone
```
$ git clone https://github.com/V-Ho/product-inventory-api
$ npm install
```

```
### Start Development Server
```
$ npm start
```

## Documentation

### PRODUCT Routes

#### GET Request
```
 1. "/products" => Display all products, with their total stock available

 2. "/products/:id" => Display product details with {id}.
```

#### PUT Request
```
 1. "/products/:id" => Sell/removes product with {id} and reduces inventory articles accordingly.

```

### License
----
[ISC](https://en.wikipedia.org/wiki/ISC_license "ISC")