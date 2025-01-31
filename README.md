---

# Tiger Blog App

Tiger Blog App is a full-stack blogging platform that allows users to create, edit, delete, and view blogs. The app features authentication and authorization to ensure users can only manage their own content. Built using modern web technologies for a seamless user experience.

## Features

### Frontend (React + Vite)
- **User Authentication**: Register, login, and logout functionality.
- **JWT-Based Authorization**: Tokens are stored and sent via cookies.
- **Blog Management**: Users can create, edit, and delete their own blogs.
- **Public Blog Viewing**: All users can view all blogs.
- **Secure Access**: Only the blog owner can modify or delete their posts.

### Backend (Express.js + MongoDB)
- **User Authentication**: Secure login and registration using JWT and bcrypt.
- **Blog APIs**: RESTful endpoints for CRUD operations.
- **Database**: MongoDB with Mongoose for data management.
- **Security**: Password hashing with bcrypt and token-based authentication with JWT.

## Technologies Used

### Frontend
- **React**: UI framework for a dynamic user experience.
- **Vite**: Fast development and build tool.
- **Cookies**: For storing and sending authentication tokens.

### Backend
- **Express.js**: Backend framework for handling API requests.
- **JWT**: JSON Web Tokens for authentication.
- **Bcrypt**: Secure password hashing.
- **Mongoose**: ODM for MongoDB database interactions.
- **MongoDB**: NoSQL database for storing user and blog data.

## Deployment

Tiger Blog App is deployed on GitHub Pages (frontend) and a cloud-based platform for the backend. You can access the live version here: [Tiger Blog App](https://simple-blog-app-peach.vercel.app/)

## Getting Started

To run the project locally:

### Frontend Setup
1. Clone this repository.
2. Navigate to the frontend folder.
3. Install dependencies using `npm install`.
4. Start the development server with `npm run dev`.
5. Open `http://localhost:5173` in your browser.

### Backend Setup
1. Navigate to the backend folder.
2. Install dependencies using `npm install`.
3. Set up environment variables (`.env` file) for database connection and JWT secret.
4. Start the server using `node index.js`.
5. API will be available at `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---