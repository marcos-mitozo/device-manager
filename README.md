## device-manager
A simple device management system, built using NodeJS + Angular

# Stack
Angular v11.2.9
Node v14.15.1
Database MySQL 8.0

# Step-by-step to locally run the app
1. Clone the repository with the following command:
  git clone https://github.com/marcos-mitozo/device-manager.git

2. Go to the directory device-manager/api and execute the file 'create-database.sh'
2.1 Insert the local database credentials so the script will run and create a database named 'device_manager'

3. Also in the folder 'api', we will have a .env.example file in the following structure:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root

API_PORT=3000
3.1 Now, we can copy/paste this file and rename the new file to '.env'
3.2 Change the variable values according to the local environment. The first 4 variables are all about to connecting with the database,
the API_PORT variable is to determine in which port the server application will run. Eg: 'http://localhost:3000'

4. Execute the backend
4.1 In a terminal, go to the directory device-manager/api of the project and execute the following commands:
```
npm install

node app.js
```
The backend application should now be running in the adress 'http://localhost:CHOSEN_PORT', according to the .env API_PORT variable.

5. Execute the frontend
5.1 In a terminal, go to the directory device-manager/web-app of the project and execute the following commands:
```
npm install

ng serve --port 4200
```
On a browser of your preference, access the following url: 'http://localhost:4200/' and you should now be able to test the application.

P.S: 
A different port can be set after 'ng serve --port' in case it's already in use;
