
# Contact Form Backend

This is a simple Express.js server that handles contact form submissions and sends emails using Nodemailer.

## Setup Instructions

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file in the server directory:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```

   Note: For Gmail, you'll need to use an App Password instead of your regular password. 
   To create an App Password:
   - Enable 2-Step Verification for your Google account
   - Go to your Google Account > Security > App passwords
   - Select "Mail" and "Other (Custom name)"
   - Generate and copy the 16-character password

3. Start the server:
   ```bash
   npm start
   ```

## Development

For development with auto-reloading:
```bash
npm run dev
```

## Production

In production, make sure to set the appropriate environment variables and consider using a process manager like PM2:
```bash
npm install -g pm2
pm2 start index.js --name "contact-form-server"
```

## API Endpoint

- **POST /api/contact** - Submit contact form data
  - Body: `{ name, email, message }`
  - Response: `{ success: 'Message sent successfully!' }` or error message
