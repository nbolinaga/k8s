FROM node:16

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY yarn.lock ./

# Copy the docs package.json
COPY apps/admin/package.json ./apps/admin/package.json

RUN yarn install

# Copy app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]