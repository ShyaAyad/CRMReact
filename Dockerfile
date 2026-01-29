# use a node runtime as the base image
FROM node:25-alpine3.22 

# set working directory in the container to /app
WORKDIR /app

# copy these two into the /app in the container
COPY package.json package-lock.json ./

# install dependencies
RUN npm install

# copy the full folder contents into the container at /app folder
COPY . .

# expose the port the app runs on vite runs on 5173 
EXPOSE 5173 

# command to run the app (development mode)
CMD ["npm", "run", "dev", "--", "--host"]