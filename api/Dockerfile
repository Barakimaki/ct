FROM node AS development

WORKDIR /ct/src/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm run build

EXPOSE 3000

FROM node AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /ct/src/app

COPY --from=development /ct/src/app/ .

EXPOSE 3000

CMD [ "node", "dist/main"]