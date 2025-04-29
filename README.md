# Peer-to-Peer Payment Flow in NestJS

A simple P2P payment feature for a wallet app, implementing an endpoint that allows a user to send money to another user. 

Use Case:
Debit the sender's balance
Credit the recipient's balance
## App Structure

```sh
|--- src
|    |--- utils
|    |--- user
|    |--- payments
|--- test
|    |--- payment.test
|--- package.json
|--- [... other environment files]
```

## Project setup
Ensure you have the following softwares installed:

- [Node](https://nodejs.org)
- [Git](https://www.atlassian.com/git/tutorials/install-git)

- Clone the [repository](https://github.com/sodiadrhain/peer-peer-payment.git) and proceed with the instructions below.

### Running locally

This app is written with Typescript, and Nodejs powers it. You can use `npm` or `yarn` (preferrably, if installed), to install packages.

## Install packages and dependancies

```
yarn install
```

### Start server

```
yarn run dev
```

### Server should be up on:

```
http://localhost:3000
```

### How to test

Make sure DB is connected

```sh
yarn install
```

to install all packages, then:

```sh
yarn test
```

to run the test cases.

_________________________________________________________________________________