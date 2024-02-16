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
- **Home Page**: Displays hotels with a special focus on the two most recently added hotels, presented with enhanced styling.

- **Search Bar**: Featured on the home page, the search bar enables users to enter the Country or City, select the number of adults and children, and input check-in and check-out dates.

- **Protected Pages**: "My Hotels" and "My Bookings" pages are protected, only accessible when the user is signed in.

- **Hotel Details**: Clicking on a particular hotel navigates the user to a detailed view with additional information. The "Book Now" option directs users to the confirm booking page with a booking summary.

- **Add Hotel Feature**: Users can add their hotels through the "Add Hotel" option on the "My Hotels" page. The form requires valid information and allows users to upload up to 6 images. Added hotels are displayed on the homepage for other users to book.

- **State Management**: Utilizes Context API for efficient state management and React Hook Form for handling various forms.
