FROM node:18 as build

WORKDIR /app

COPY package.json yarn.lock ./
COPY yarn.lock .
RUN yarn install --frozen-lockfile --no-cache
RUN yarn postinstall

COPY . .

RUN yarn build:all

ENV NODE_ENV development

CMD ["yarn", "dev"]

FROM node:18 as prod

ENV NODE_ENV production

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production

COPY . .
COPY --from=build /app/public/build /app/public/build
COPY --from=build /app/build /app/build
COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/app/tailwind.css /app/app/tailwind.css
COPY --from=build /app/node_modules/remix /app/node_modules/remix

CMD ["yarn", "production"]
