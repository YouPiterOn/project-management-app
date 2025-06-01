FROM node:23-alpine AS base

WORKDIR /app

RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/backend/package.json packages/backend/
COPY packages/frontend/package.json packages/frontend/

RUN yarn install --frozen-lockfile

COPY . .

FROM base AS backend-builder

WORKDIR /app/packages/backend

RUN yarn run build

FROM base AS frontend-builder

WORKDIR /app/packages/frontend

RUN yarn run build

FROM node:23-alpine AS backend-prod

WORKDIR /app

COPY --from=backend-builder /app/packages/backend/dist ./dist
COPY --from=backend-builder /app/node_modules ./node_modules
COPY packages/backend/package.json ./

ENV NODE_ENV=production

CMD ["node", "dist/main"]

FROM nginx:stable-alpine AS frontend-prod

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=frontend-builder /app/packages/frontend/dist /usr/share/nginx/html
