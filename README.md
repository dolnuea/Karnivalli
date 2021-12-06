## karnivalli

Welcome to the Karnivali Game Hub

We are creating an online games platform that will allow developers to deliver content to users seemlessly with a speed that hasn't been seen before. 

We focus on user experience, robust desgin and an intuitive layout to deliver a product that stands apart from our competitiors. 

## How to get Team 2's Project up and running locally:

Make sure that you have python 3.8 or 3.9 installed on your computer 
If you don't have it, you can download it here: https://www.python.org/downloads/

Make sure that you have node.js installed on your computer
- If you don't have it, you can download it here: https://nodejs.org/en/download/

Clone the code from: https://serd.uab.albany.edu/team-2/karnivalli. Make sure you are using the main branch.

Go to the folder karnivalli/backend . Make sure you can see a file named requirements.txt. Then you need to execute this command in this folder in your terminal: pip install -r requirements.txt . This will install all the libraries needed to run the backend server. Also make sure you have postgre db running in your system whose port number and host can be changed in the file location backend/karnivali/settings.py, and as of now the line number 87.

Install redis server and run it:
If you don't have it, you can download it here: https://github.com/MSOpenTech/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.msi
Then go to the installed location, by default it will be "C:\Program Files\Redis\" and run the redis-cli application. It will start the server

Now you need to run the backend Django server. Just execute this command in the folder karnivalli/backend :  python manage.py runserver . You will see the server is up and running.

Now you need to run the frontend react server. Just go to the folder karnivalli/frontend and execute these commands sequentially:
npm install
npm start 
In a moment, a new window should pop up, our project will be running locally. 

The deployable version of the codes can be found in the projects, https://serd.uab.albany.edu/team-2/backend_deployable and https://serd.uab.albany.edu/team-2/frontend_deployable .
