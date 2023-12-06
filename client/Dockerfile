# Build stage
FROM node:16-alpine as build

WORKDIR /usr/src/reactapp

RUN chown -R node:node /usr/src/reactapp

USER node

COPY *.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY src src
COPY public public

RUN yarn run build

# Production stage
FROM node:16-alpine

WORKDIR /usr/src/app

# Install serve globally
RUN yarn global add serve

# Copy the built React app from the build stage
COPY --from=build /usr/src/reactapp/build /usr/src/app

EXPOSE 5000

# Start serve to serve the app
CMD ["serve", "-s", ".", "-l", "5000"]
