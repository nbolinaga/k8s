# Build stage
FROM node:16 AS builder

WORKDIR /usr/src/app

# Copy client package.json and lockfile
COPY apps/client/package.json ./
COPY apps/client/yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy app source
COPY apps/client/src ./src
COPY apps/client/next.config.js .
COPY apps/client/tsconfig.json .

RUN yarn build

# Final stage
FROM node:16

WORKDIR /usr/src/app

# Copy built artifacts from the builder stage
COPY --from=builder /usr/src/app/.next ./.next

# Copy client package.json and lockfile
COPY apps/client/package.json ./
COPY apps/client/yarn.lock ./

RUN yarn install --frozen-lockfile --production

EXPOSE 3002

CMD [ "yarn", "start" ]
