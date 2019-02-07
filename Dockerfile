FROM node:10.15.0-alpine

ENV appDir /var/www/app/current

# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR ${appDir}

# Add our package.json and install *before* adding our application files
ADD package.json ./
RUN npm i --production

# Install pm2 *globally* so we can run our application
RUN npm i -g pm2

# Now add application files
ADD . /var/www/app/current

RUN yarn install

#Expose the port
EXPOSE 3000

# Start app using pm2's runtime via server.config.json specs
CMD ["pm2-runtime", "server.config.json"]