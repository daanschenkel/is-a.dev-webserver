FROM node:latest

# Create the directory!
RUN mkdir -p /usr/src/dev
WORKDIR /usr/src/dev

# Copy and Install our site
COPY package.json /usr/src/dev
ENV CI=false

RUN npm install
COPY . /usr/src/dev




# For Debugging
#RUN apt-get update && apt-get install -y \
#    nano \
#    curl \
#    git \
#    && rm -rf /var/lib/apt/lists/*

# Start me!
CMD ["npm", "."]
