FROM node:18.18-alpine3.18

RUN npm install -g @nestjs/cli@10.0.0

USER node

WORKDIR /home/desktop/PortableGit/Api-em-Nest