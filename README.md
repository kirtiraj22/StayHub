# StayHub

StayHub is a modern room booking platform developed using the MERN stack with TypeScript. The platform allows users to seamlessly search for hotels, apply various filters (e.g., rating, hotel type, facilities, price), and sort hotels based on star ratings and prices.

## Tech Stacks

### Backend

- **Node.js & Express**: Server-side logic is implemented using Node.js and Express.
- **MongoDB & Mongoose**: MongoDB is used as the database, and Mongoose is the ODM for MongoDB and Node.js.
- **TypeScript**: The entire backend is developed using TypeScript for enhanced type checking and better code maintainability.
- **bcrypt & jsonwebtoken**: Used for user authentication and securing sensitive data.
- **express-validator & cookie-parser**: Middleware for request validation and parsing cookies.
- **Cloudinary & Multer**: Used to manage and handle images.
- **Stripe**: Integration for creating payment intents and handling payments.

### Frontend

- **React (with Vite) & TypeScript**: The frontend is built using React with TypeScript for robust type safety.
- **Tailwind CSS**: A utility-first CSS framework for styling the UI.
- **React Hook Form & React Query**: Libraries for handling form state and managing server-state respectively.
- **React Icons & React Datepicker**: UI components for icons and date picking.
- **React Router DOM**: For handling client-side routing.
- **Stripe SDK**: Integration with the Stripe payment gateway for hotel bookings.

### Testing

- **Playwright**: Utilized for end-to-end testing purposes.

## Project Setup

1. Navigate to the backend folder and install dependencies: `cd backend && npm install`
2. Start the backend server: `npm start`
3. Navigate to the frontend folder and install dependencies: `cd frontend && npm install`
4. Start the frontend development server: `npm run dev`

## Additional Details

