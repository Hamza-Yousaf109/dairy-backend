# Use the official Node.js base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the application's port
EXPOSE 5000

# Define the entry point to run your application
CMD ["node", "index.js"]

