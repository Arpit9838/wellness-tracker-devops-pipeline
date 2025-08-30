# Use official Node image
FROM node:18

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the Vite project
RUN npm run build

# Expose the same port as preview
EXPOSE 3000

# Start the production preview
CMD ["npm", "run", "preview"]
