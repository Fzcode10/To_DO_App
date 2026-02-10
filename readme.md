M: MongoDn (Database) 
E: Express (Backend)
R: React (Frontend)
N: NodeJs (Backend)


## Frontend (Browser / Client side)         Bcakend (Server Side)      DB (Server Side)
  
      React App                                ExpressJs + NodeJs        MongoDb



## Frontend
  
  # npm init
  # npm i epxpress
  # npm i mongoose
  # npm i dotenv
  # npm i nodemon

## Api Endpoint

Method              API                 Work

GET             /workouts           --> Get all the To-do list 
POST            /workouts           --> Create a new To-Do 
DELETE          /workouts/:id       --> Delete a single To-Do 
PATCH           /workouts/:id       --> Update a single TO-Do  


## Frontend
  # npx create-react-app
  # npm i react-router-dom



# To-Do App Project

## Working of To-Do App

### Frontend
On the main page, all todos are retrieved from the database using the **GET** method.  
The following functionalities are available on the page:

- **Edit:** Edit a todo using the **PATCH** method with the API call `/todos/:id`
- **Delete:** Delete a todo using the **DELETE** method with the API call `/todos/:id`
- **Add New:** Add a new todo using the **POST** method with the API call `/todos/addnew`

### Backend
Based on the API calls, the backend retrieves data, edits data, or adds new data to the database.  
Using a database connection and a todo model, all the data stored in the database is managed through the backend.

### Database
I used a MongoDB cluster, which stores data on an online cloud.  
With the help of the backend, the database is updated accordingly.

---

## Problems Faced in the To-Do App Project

### Frontend
- To update objects on the page in real time, I applied **useReducer**, which I learned from a previous lecture.
- While sending full details of todos, I faced issues with passing unique keys for individual todos.
- In the edit functionality, I struggled to adjust the font size properly.

### Backend
- I faced issues while setting up the database connection.
- While creating the todo model, I had difficulty setting the default status (completed or not). Eventually, I set the default value to **false** when adding new todos.

### Deployment
- I first deployed the backend on **Railway**. While setting environment variables, I faced some issues, which I resolved with the help of YouTube videos.
- Due to not using the **CORS** function in the backend, I faced issues with different URLs for the frontend and backend. I resolved this by using a `netlify.toml` file in the frontend.
- During the deployment of both the frontend and backend, I took help from YouTube tutorials.

---

## Deployed Link
🔗 https://chic-monstera-6ba20d.netlify.app/
