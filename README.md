covers both backend and frontend components, providing a secure and efficient way to manage users, with support for registration, authentication, and CRUD operations.

Backend (Node.js & MySQL)
JWT (JSON Web Tokens): Implemented JWT for secure authentication and authorization, ensuring that only authenticated users can access protected routes.
Express Validator: Used Express Validator to validate incoming requests, ensuring data integrity and security before processing it.
Custom Modules: Developed custom modules for consistent code structure and standardized response handling, providing clear and uniform feedback to the client.
Frontend (React)
React Hooks: Utilized React Hooks for state management and lifecycle methods, simplifying component logic and making the code more readable.
React Hook Form: Managed forms efficiently with React Hook Form, ensuring smooth validation and error handling.
Material-UI (MUI): Implemented a modern and responsive UI using Material-UI, enhancing the user experience with a clean design and interactive components.
Security and Best Practices
Password Hashing: User passwords are securely hashed before being stored in the database.
HTTP-only Cookies: JWTs are stored in HTTP-only cookies to prevent client-side script access and reduce the risk of XSS attacks.
Standardized API Responses: All API responses are structured uniformly to provide clear, consistent feedback, aiding both frontend integration and debugging.
Adding these details provides a more complete picture of the backend architecture and the technologies used to ensure security, validation, and consistency throughout the application
Features
Backend (Node.js & MySQL)
Database Setup:

A MySQL database named userdb was created.
The database schema includes a users table with columns: id, firstname, lastname, email, and password.
User CRUD Operations:

Implemented on the /api/users route.
These operations are protected by JWT authentication to ensure only authenticated users can access them.
User Registration:

API endpoint /api/register allows new users to register.
Accepts JSON payloads with firstname, lastname, email, and password.
Passwords are hashed before storing in the database to ensure security.
User Login:

API endpoint /api/login allows users to log in.
Accepts JSON payloads with email and password.
Verifies credentials and generates a JWT, which is stored as an HTTP-only cookie.
User Logoff:

API endpoint /api/logout allows users to log off, clearing the JWT cookie.
Frontend (React)
React App Setup:

The frontend was created using Create React App, providing a responsive and modern UI.
User Registration UI:

A registration form allows users to register by submitting firstname, lastname, email, and password.
Communicates with the /api/register endpoint.
User Login UI:

A login form that allows users to authenticate with their email and password.
Communicates with the /api/login endpoint.
User Logoff UI:

A logoff button that logs users out by clearing the JWT cookie and communicating with the /api/logout endpoint.
User List UI:

Displays a list of all registered users.
Fetches user data from the /api/users endpoint using JWT for authentication.
Security Features
Password Hashing: User passwords are securely hashed before being stored in the database.
JWT Authentication: Ensures that sensitive routes are protected and only accessible to authenticated users.
HTTP-only Cookies: JWTs are stored in HTTP-only cookies to prevent client-side script access and reduce the risk of XSS attacks.
Evaluation Criteria
Code Quality: The project follows clean, well-organized, and readable coding practices.
Backend Skills: Efficient use of Node.js and MySQL for implementing CRUD operations and authentication.
Security: The application implements secure practices, including password hashing and secure JWT handling.
Frontend Skills: The React frontend demonstrates effective state management and a user-friendly UI.
Testing: The application has been thoroughly tested to ensure the correctness and security of the authentication flow, CRUD operations, and UI components.


