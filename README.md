# Full-Stack-Application (Nodejs MongoDB Express Ejs)

•	Its Full stack application for computer science department. The application is admin based, where admins will have basic Authentication Login and Registration abilities.

•	Application have CRUD Operation capabilities. That means admin can Create, Read, Update and Delete the applicant information.

•	Application will have the Advanced search capabilities, to search based on year, name, concentration etc.

•	Build Visualization to make clear and concise visual representation of data.

•	I am using Nodejs and MongoDB as my Backend and HTML, Bootstrap as Frontend.





# How to Configure and Install this Application:

	Software Requirement:

•	Nodejs 14+

•	Any Editor(I have used Visual Studio)

•	MongoDB Atlas or MongoDB or You can access the MongoDB with cloud as well. I used MongoDB Atlas for this Project.



	Download Zip

•	Download repository

•	Uncompress to your desired directory

•	Install npm dependencies after installing
cd MongoCon

	Dependencies to install are:
  
  
npm install and type the name of these dependencies on the console, without inverted commas.

    "bcryptjs"
    
    "body-parser"
    
    "connect-flash"
    
    "crypto"
    
    "ejs"
    
    "express"
    
    "express-ejs-layouts"
    
    "express-handlebars"
    
    "express-session"
    
    "gridfs-stream"
    
    "method-override"
    
    "mongoose"
    
    "multer"
    
    "multer-gridfs-storage"
    
    "once"
    
    "passport"
    
    "passport-local”
    
    "path"
    
    "util"
    
    "nodemon"


 
	How to run

•	Running API server locally
	npm run dev

•	You will know server is running by checking the output of the command npm run dev

 
•	You might get some warnings ignore those, that might be because of Mongoose library installation version.

•	Once shown running on terminal, you can see type Localhost:5000 on the browser to see web application running.

•	Press CTRL + C to stop the process.


•	Creating new models

o	If you need to add more models to the project just create a new file in /models/ and use them in the controllers.


•	Creating new routes

o	If you need to add more routes to the project just create a new file in /routes/ and add it in /routes/api.js it will be loaded dynamically.


•	Creating new views

o	If you need to add more pages to the project just create a new file in /views/ and use them in the routes.

