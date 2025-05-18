FROM node AS development

WORKDIR /ct/frontend/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@17.3.6

COPY . .

RUN npm run build

EXPOSE 4200
