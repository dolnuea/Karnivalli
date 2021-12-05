# karnivalli

Welcome to the Karnivali Game Hub

We are creating an online games platform that will allow developers to deliver content to users seemlessly with a speed that hasn't been seen before. 

We focus on user experience, robust desgin and an intuitive layout to deliver a product that stands apart from our competitiors. 

# How to get Team 2's Project up and running locally:


1) Make sure that you have python 3.8 installed on your computer
	- If you don't have it, you can download it here: https://www.python.org/downloads/



2) Make sure that you have node.js installed on your computer
	- If you don't have it, you can download it here: https://nodejs.org/en/download/



3) You can use pip to install these commands in your terminal:
	 - pip install django djangorestframework django-cors-headers
     - pip install channels
     - pip install channels-redis==2.4.2
	 - pip install django-cors-headers
	 - pip install djangorestframework-simplejwt



4) Clone the code from: https://serd.uab.albany.edu/team-2/karnivalli
	- npm install axios
	- cd into the django frontend folder and execute the 'npm install' command to install dependencies

	

5) Install redis server and run it
	- If you don't have it, you can download it here: https://github.com/MSOpenTech/redis/releases/download/win-3.2.100/Redis-x64-3.2.100.msi
	- Then go to the installed location, by default it will be "C:\Program Files\Redis\" and run the redis-cli application. It will start the server



6) Open a terminal window in the '\karnivalli\backend\' folder and run:
	- python manage.py runserver



7) Open another terminal window in the '\karnivalli\frontend' folder and run:
	- npm start

	

In a moment, a new window should pop up, our project will be running locally. 
