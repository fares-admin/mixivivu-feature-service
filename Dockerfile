FROM node:lts as dependencies
WORKDIR /feature-service
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /feature-service
COPY . .
COPY --from=dependencies /feature-service/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /feature-service
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /feature-service/next.config.js ./
COPY --from=builder /feature-service/public ./public
COPY --from=builder /feature-service/.next ./.next
COPY --from=builder /feature-service/node_modules ./node_modules
COPY --from=builder /feature-service/package.json ./package.json

ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 3005
CMD ["yarn", "start"]
