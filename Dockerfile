FROM node:20

# FROM mcr.microsoft.com/playwright:1.40.0

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx playwright install-deps
RUN npx playwright install

COPY . .

CMD ["npm", "run", "test"]
