# Use official Node.js image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code
COPY . .

# Expose the backend port (assuming your backend runs on 5000)
EXPOSE 5000

# Start your backend application (adjust start command if needed)
CMD ["npm", "start"]