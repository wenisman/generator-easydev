FROM 278521702583.dkr.ecr.us-west-2.amazonaws.com/arch/node-v8-xenial:v1.8.0

ARG COMPONENT

ENV APP_DIR /app

WORKDIR "${APP_DIR}"

COPY ["dist", "${APP_DIR}/"]
COPY ["node_modules", "node_modules/"]

EXPOSE 3000 3001

CMD ["node", "main.js"]
