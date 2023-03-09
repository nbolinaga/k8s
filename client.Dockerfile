FROM node:16

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY package.json ./
COPY yarn.lock ./

# Copy the docs package.json
COPY apps/client/package.json ./apps/client/package.json

RUN yarn install

# Copy app source
COPY . .

RUN yarn build

EXPOSE 3002

CMD [ "yarn", "start" ]

