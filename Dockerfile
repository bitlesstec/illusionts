#to create the container from node

# FROM node:14.14
# RUN mkdir app
# #copying app needed files to root folder
# COPY package.json package-lock.json app/
# COPY game /app/game
# WORKDIR app/
# #download all used node dependencies 
# RUN npm install --production
# RUN npm run build
# CMD [ "npm","run","start" ]

#to just paste the game folder and start the server
FROM httpd:2.4

COPY game/ /usr/local/apache2/htdocs/