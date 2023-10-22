FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN npm install; exit 0
# RUN npm install

# If you are building your code for production
RUN npm ci --omit=dev
# RUN npm run prod --omit=dev

# Bundle app source
COPY . .

EXPOSE 5555

# CMD [ "node", "./server/index.js" ]
CMD ["npm", "run", "prod"]
