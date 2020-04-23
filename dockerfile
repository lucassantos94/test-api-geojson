FROM node:12.16.1 AS builder
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./tsconfig.json ./
COPY ./src ./src/


RUN npm ci --quiet && npm run build

FROM node:12.16.1-slim

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/build ./build