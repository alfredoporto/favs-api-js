# favs-api-js

**Summary** 

CRUD for favs and login and sign up capabilities, all secured by JWT.

## Overview

Features:
  * sign-up
  * sign-in
  * creation of user's favs list
  * modification of user's favs list
  * retrival of user's fav list

## Installation

```
(*) All commands shown are for arch distribution, might work on other distros that uses pacman

Make sure everything is up to date: 
$ sudo pacman -Syu

Install docker: 
$ sudo pacman -S docker

Install project dependencies:
$ npm install favs-api

Make sure to create .env file
```

## Basic use

```
Start docker: 
$ sudo systemctl start docker

Run mongo image: 
$ docker run -d -p 27017:27017 mongo

Run Express: (within project directory at root level) 
$ node index.js

```

## API 

* **POST /users/signin**      *create an account*
* **POST /users/signup**      *log into an account*
* **POST /favs/**             *creates a list of favs in the user account*
* **GET /favs?user=**         *retrieves all user's list of favs*
* **GET /favs/:id?user=**     *retrieves a specific user's list of favs *
* **PUT /favs/:id**           *push an additional element to a list of favs*
* **DELETE /favs/:id?user=**  *delete a fav from a list of favs*

The endpoints can be hidden behind a reverse proxy like nginx ;)


