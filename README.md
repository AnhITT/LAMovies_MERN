# LAMovies MERN Project
This is a MERN (MongoDB, Express.js, React.js, Node.js) stack project consisting of three main components:

- Backend Node.js: Provides the API endpoints.
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
cd backend
npm install

# Install frontend dependencies for customer
cd ../frontend_customer
npm install

# Install frontend dependencies for admin
cd ../frontend_admin
npm install
```
# Usage
1. Backend Setup:

- Ensure MongoDB is installed and running.

- In the backend directory, create a .env file with the following environment variables:
```bash
MONGODB_URI=your_mongodb_uri
PORT=5000
```
2. Starting the Backend:

- In the backend directory, run:

```bash
npm start
```
3. Frontend Setup:

- In both frontend_customer and frontend_admin directories, create a .env file with the following content:

```bash

REACT_APP_API_URL=http://localhost:5000/api
```
4. Starting the Frontend:

- For customer frontend, in the frontend_customer directory, run:

```bash
npm start
```
- For admin frontend, in the frontend_admin directory, run:

```bash
npm start
```
5. Access the applications in your browser:

- Customer frontend: http://localhost:3000
- Admin frontend: http://localhost:3001
# Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

# License
This project is licensed under the MIT License.
