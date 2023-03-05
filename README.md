# todo_app
TODO App website built using MERN stack and dockerized. 

Link to website: https://todoapp-nathan.herokuapp.com/

Must create a .env file in the root folder and include variables:
ATLAS_URI=(the URI to your MongoDB database)
JWT_SECRET=(a random string for user authentication encryption, recommended at least 32 characters)
PORT=(the port you want to host the app on) (Optional)

Then you can build the docker image using 
> docker-compose build 
then start the container with
> docker-compose up

Open the app on localhost:3000 or whichever port you're using.