FROM node:9.11-alpine

RUN apk add --update --no-cache build-base \
                                python2 \
    && ln -sf /usr/bin/python2.7 /usr/bin/python

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 80
ENV PORT=80

CMD ["npm", "run", "start:prod"]
