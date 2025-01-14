# Use the official Node.js image.
FROM node:20-alpine

# Install Python, pkg-config, and additional libraries for canvas
RUN apk add --no-cache python3 make g++ pkgconfig cairo-dev pango-dev libpng-dev

# Set the working directory in the container.
WORKDIR /app

# Create a volume at the root directory.
VOLUME ["/"]

# Copy package.json and package-lock.json to install dependencies.
COPY package*.json ./

# Install the project dependencies.
RUN npm install --force || npm install --legacy-peer-deps

# Copy the rest of your Next.js application files.
COPY . .

# Build the Next.js application.
RUN npm run build

# Expose the port on which your app will run.
EXPOSE 3000

# Command to run your Next.js app.
CMD ["npm", "start"]
