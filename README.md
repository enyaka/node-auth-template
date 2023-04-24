# NodeJS Auth Template

This is an authentication template for practice to access and refresh token for my IOS Applications.

## Installation

Clone the repo and install the dependencies.

```bash
https://github.com/enyaka/node-auth-template.git
cd node-auth-template
```
```bash
npm install
```
After installation you must create a .env file. The inside of the env file must be like this:
```env
// Domain variables
PORT=YOUR_PORT
DOMAIN_NAME=YOUR_DOMAIN

// Mongodb variables
MONGO_URL=YOUR_MONGODB_URL

//JWT
ACCESS_SECRET=YOUR_ACCESS_TOKEN_SECRET
REFRESH_SECRET=YOUR_REFRESH_TOKEN_SECRET
```

## Usage

```bash
npm start
```
