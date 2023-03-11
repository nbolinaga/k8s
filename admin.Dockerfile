# Build stage
FROM node:16 AS builder

WORKDIR /usr/src/app

# Copy admin package.json and lockfile
COPY apps/admin/package.json ./
COPY apps/admin/yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy app source
COPY apps/admin/src ./src
COPY apps/admin/next.config.js .
COPY apps/admin/tsconfig.json .

RUN yarn build

# Final stage
FROM node:16

WORKDIR /usr/src/app

# Copy built artifacts from the builder stage
COPY --from=builder /usr/src/app/.next ./.next

# Copy admin package.json and lockfile
COPY apps/admin/package.json ./
COPY apps/admin/yarn.lock ./

RUN yarn install --frozen-lockfile --production

EXPOSE 3000

CMD [ "yarn", "start" ]
