This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Currently ${FONTAWESOME_TOKEN} is an environment variable.
Add it to your .bashrc .zshrc or preferred file of choice.

## Setup for Local Development OAuth flow
* Install db-migrate globally `npm i -g db-migrate`
* Go to the server directory and run `docker-compose up -d`
  * You need docker installed on your machine if you don't (https://www.docker.com/)
* Edit /etc/hosts file
  * Add `127.0.0.1  dev.my.oregonstate.edu` to the end of file
* Run `export NODE_ENV=production`
  * To clear this run `unset NODE_ENV`
  * NOTE: We only need this if we want to test SAML and CANVAS OAUTH on our local machine

