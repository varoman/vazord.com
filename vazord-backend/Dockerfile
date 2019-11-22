FROM node:12.2.0-alpine
FROM postgres

WORKDIR app/
COPY .  /app
RUN /node_modules/.bin install
CMD ["node"]
