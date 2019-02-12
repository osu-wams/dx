FROM node:10.15.0-alpine

RUN apk add yarn

ENV appDir /var/www/app/current

# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR ${appDir}

# Add our package.json and install *before* adding our application files
ADD ./server/package.json ./
RUN yarn install

# Install pm2 *globally* so we can run our application
RUN yarn global add pm2

# Now add application files
ADD ./server ./
ADD ./pm2.config.js ./

#Expose the port
EXPOSE 3000

# Start app using pm2's runtime via server.config.json specs
ENTRYPOINT ["pm2-runtime", "pm2.config.js"]
CMD ["--env=production"]