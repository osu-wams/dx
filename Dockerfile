FROM node:10.15-alpine

RUN set -eux; \
    apk add yarn; \
    mkdir -p /var/www/app/current

# ENV appDir /var/www/app/current

# Set the work directory
RUN mkdir -p /var/www/app/current
# WORKDIR ${appDir}
WORKDIR /var/www/app/current

# Add our package.json and install *before* adding our application files
# Install pm2 *globally* so we can run our application
ADD ./server/package.json ./
RUN yarn install; \
    yarn global add pm2

# Now add application files
ADD ./server ./
ADD ./pm2.config.js ./

#Expose the port
EXPOSE 3000

# Start app using pm2's runtime via server.config.json specs
ENTRYPOINT ["pm2-runtime", "pm2.config.js"]
CMD ["--env=production"]
