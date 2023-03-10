FROM node:16

WORKDIR /usr/src/app/admin

# Copy root package.json and lockfile
COPY package.json ./
COPY yarn.lock ./

# Copy the docs package.json
COPY apps/admin/package.json ./apps/admin/package.json

RUN yarn install

# Copy app source
COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]