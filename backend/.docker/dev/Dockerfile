FROM node:9.11-alpine

RUN apk add --update --no-cache build-base \
                                python2 \
    && ln -sf /usr/bin/python2.7 /usr/bin/python

WORKDIR /app

CMD ["npm", "start"]
