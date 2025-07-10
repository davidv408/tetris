# STAGE 1: Build
FROM node:22.16.0 AS build
# Sets the working directory to /app
WORKDIR /app
# Copy project package.json and package-lock.json files to working directory
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy local directory to working directory
COPY . .
# Build production version of application
RUN npm run build

#  STAGE 2: Run
FROM nginx:stable
COPY --from=build app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["npm", "run", "dev"]