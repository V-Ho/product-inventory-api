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
When using docker-compose:
- Ensure [Docker for Desktop](https://www.docker.com/products/docker-desktop) is installed and running

When using locally:
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) 
- Postman - Download and Install [Postman](https://www.getpostman.com/downloads) - Implementation with postman latest version.


## Installation

### 1. Run application using docker
```
$ git clone https://github.com/V-Ho/product-inventory-api
$ docker-compose up -d
```


### 2. Run application locally
```
$ git clone https://github.com/V-Ho/product-inventory-api
$ npm install
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
 Note: the 'inventory.json' file needs to be repopulated if request returns 'product stock not available'

```

### License
----
[ISC](https://en.wikipedia.org/wiki/ISC_license "ISC")