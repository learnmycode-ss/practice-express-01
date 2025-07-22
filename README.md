# Learn Project

This project is a Node.js Express app with EJS views and form validation using express-validator.

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the server:**
   ```sh
   node form.js
   ```

3. **Open in browser:**
   ```
   http://localhost:3030/myform
   ```

## Features

- User registration form (username, email, password, age, city)
- Bootstrap styling
- Password show/hide toggle
- Validation for all fields

## Validation

- Username: Required, min 3 characters
- Email: Must be valid
- Password: 8-24 chars, strong password
- Age: Numeric, at least 18
- City: Rajkot, Ahmedabad, or Amreli

## File Structure

- `form.js` - Express server and validation
- `views/myform.ejs` - Registration form view

## Execute Markdown

Markdown files are for documentation only.  
To run code, use the