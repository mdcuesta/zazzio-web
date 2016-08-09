FROM node:argon

# Create zazzio directory
RUN mkdir -p /usr/src/zazzio
WORKDIR /usr/src/zazzio

# Install zazzio dependencies
COPY package.json /usr/src/zazzio/
RUN npm install --only=production

# Bundle zazzio source
COPY . /usr/src/zazzio

EXPOSE 80
CMD [ "npm", "run release" ]