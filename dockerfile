# Stage 1: Build the React app
FROM --platform=linux/amd64 node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --production

COPY . .

RUN npm run build

# Stage 2: Create the production-ready image
FROM --platform=linux/amd64 nginx:1.21-alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
