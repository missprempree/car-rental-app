# Use a base image with Node.js 22.12.0  
FROM node:22.12.0

# Set the working directory  
WORKDIR /app  

# Copy the package.json and package-lock.json files  
COPY package*.json ./  

# Install dependencies  
RUN npm install

# Set environment variable to disable Angular CLI cache  
ENV NG_CLI_ANALYTICS=false
ENV NPM_CONFIG_CACHE=/tmp/npm-cache

# Copy the Angular project files  
COPY . .  

# Build the Angular application
RUN npm run build

# Expose the port that Nginx will listen on  
EXPOSE 4200  

# Start the Node.js application
CMD ["npm", "start"]

# Labelize
LABEL org.opencontainers.image.source=https://github.com/missprempree/car-rental-app