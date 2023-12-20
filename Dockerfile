FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Command to run the application
CMD ["npm", "run", "start:prod"]