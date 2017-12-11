# Kamina.JS
![Kamina_Logo](kamina_logo.svg)  
Kamina frontend written with VueJS

# What is Kamina?
IPFS-based decentralized social networking platform

# What is this repo?
This is an implementation of Kamina(the frontend) using VueJS as our framework

# Installation
There are some requirements you have to meet before using the frontend
* [NodeJS](https://nodejs.org/en/) (LTS is a good option)
* [Npm](https://www.npmjs.com/get-npm) (normally comes bundled with node)
* Be sure the backend and your ipfs daemon are running
* Some basic terminal skills

1. Clone the repo and cd into the created directory
```sh
git clone https://github.com/ImplyingProgramming/kamina-frontend.git
cd kamina-frontend
```
2. Install the needed dependencies from npm
```sh
npm install
```
3. Start the development server
```
npm run dev
```

# How does this work
This is a web application that will use [this](https://github.com/carmelo12341/kamina-backend) as the backend.

#### Getting the information
This will basically consume the backend's api. It is written with ES6 and VueJS.

#### Further reading
[Vue.js Guide](https://vuejs.org/v2/guide/)  
[Javascript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) (Includes ES6)

# Needed features before v1.0
* Searching
* Create a response to a thread
* Post as a user-defined name
* Don't allow other users to use that same name (optional)