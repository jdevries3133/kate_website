FROM node:17-alpine

RUN apk add sqlite

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --verbose

COPY schema.prisma .
RUN npm run prisma:generate --verbose
RUN npm run prisma:migrate --verbose

COPY . .

RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
