#<--Stage1--->

FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#<---Stage2--->

FROM node:18-alpine

RUN adduser -S appuser

WORKDIR /app

COPY --from=builder /app .

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]

