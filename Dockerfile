FROM node:24 AS builder
WORKDIR /app

# Copie uniquement les fichiers nécessaires au build
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

COPY public ./public
COPY src ./src
COPY astro.config.mjs .
COPY tailwind.config.js .
COPY postcss.config.js .
COPY tsconfig.json .
COPY CNAME . 

RUN npm run build

FROM nginx:alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

USER appuser
