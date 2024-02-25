# LAMovies MERN Project
This is a MERN (MongoDB, Express.js, React.js, Node.js) stack project consisting of three main components:

- Back-end: Provides API endpoints using Express.js.
- Front-end Customer: Built with ReactJS, this part of the application is intended for general users or customers.
- Front-end Admin: Also developed with ReactJS, this portion of the project is designed for administrative purposes.

# Installation
To set up this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/AnhITT/LAMovies_MERN.git
```

2. Navigate into the project directory:

```bash
cd LAMovies_MERN
```
3. Install dependencies for both backend and frontend:

```bash
# Install backend dependencies
cd lamovies_be
npm install

# Install frontend dependencies for customer
cd ../lamovies_fe
npm install

# Install frontend dependencies for admin
cd ../lamovies_fe_admin
npm install
```
# Usage
1. Backend Setup:

- Ensure MongoDB is installed and running.

- In the backend directory, change a app.js file with the following environment variables:
```bash
mongoose.connect("mongodb://127.0.0.1:27017/lamovies_api");
```
2. Starting the Backend:

- In the backend directory, run:

```bash
npm start
```
The backend should now be running at http://localhost:3000.

3. Frontend Setup:

- In both frontend_customer and frontend_admin directories, create a .env file with the following content:
3.1. For customer frontend:
```bash
REACT_APP_URL_API=http://localhost:3000
PORT=3001
```
3.2. For admin frontend:
```bash
REACT_APP_URL_API=http://localhost:3000
PORT=3002
```
4. Starting the Frontend:

- For customer frontend, in the frontend_customer directory, run:

```bash
npm start
```
The client interface will now run at http://localhost:3001.
- For admin frontend, in the frontend_admin directory, run:

```bash
npm start
```
The admin interface will now run at http://localhost:3002.
5. Access the applications in your browser:

- Customer frontend: http://localhost:3001
- Admin frontend: http://localhost:3002
# Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

# License
This project is licensed under the MIT License.
