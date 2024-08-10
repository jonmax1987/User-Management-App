# User Management App

This project is a full-stack application covering both backend and frontend components. It provides a secure and efficient way to manage users, supporting registration, authentication, and CRUD operations.

## Key Features

### Backend (Node.js & MySQL)
- **JWT Authentication**: Secure authentication and authorization.
- **Express Validator**: Ensures data integrity.
- **Custom Modules**: Standardized API responses.

### Frontend (React)
- **React Hooks**: Simplified state management.
- **React Hook Form**: Efficient form handling.
- **Material-UI (MUI)**: Modern UI components.

## Security and Best Practices
- **Password Hashing**: Secure storage of user passwords.
- **HTTP-only Cookies**: Protect against XSS attacks.
- **Standardized Responses**: Uniform API feedback.

## Technical Details

### Backend Setup
- **Database**: MySQL database `userdb` with `users` table.
- **CRUD Operations**: Secured by JWT on `/api/users`.

### Frontend Setup
- **React App**: User-friendly UI with registration and login forms.
- **Protected Routes**: Accessible only after authentication.

### Evaluation Criteria
- **Code Quality**: Clean, well-organized code.
- **Security**: Best practices for handling passwords and JWTs.
- **UI/UX**: Effective state management and user-friendly design.
