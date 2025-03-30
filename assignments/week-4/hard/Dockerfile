# Use stable LTS version of Node.js
FROM node:20-alpine

# Set working directory
WORKDIR /home/app

# Copy package files first (optimizing caching)
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy rest of the application files
COPY . .

# Expose only necessary ports
EXPOSE 8000

# Use production-ready command
CMD ["npm", "run", "start"]
