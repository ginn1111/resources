FROM node:18-alpine as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM deps as build
WORKDIR /app
COPY . .
RUN yarn build

FROM nginx:1.18.0-alpine as runner
COPY --from=build /app/ /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
