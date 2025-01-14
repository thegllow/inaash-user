# Use the official Node.js image.
FROM node:20-alpine

# Set the working directory in the container.
WORKDIR /app

# Create a volume at the root directory.
VOLUME ["/"]

# Copy package.json and package-lock.json to install dependencies.
COPY package*.json ./
 
# Install the project dependencies.
RUN npm install --force or --legacy-peer-deps

# Copy the rest of your Next.js application files.1
COPY . .

# Build the Next.js application.
RUN npm run build

# Expose the port on which your app will run.
EXPOSE 3000

# Command to run your Next.js app.
CMD ["npm", "start"]
