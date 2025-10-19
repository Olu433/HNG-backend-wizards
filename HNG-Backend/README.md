# Backend Wizards - Stage 0: Dynamic Profile Endpoint

A RESTful API that returns profile information along with a dynamic cat fact fetched from an external API.

## 🚀 Features

- ✅ RESTful GET endpoint at `/me`
- ✅ Dynamic cat facts from Cat Facts API
- ✅ ISO 8601 timestamp generation
- ✅ Graceful error handling with fallback
- ✅ CORS enabled
- ✅ Request logging
- ✅ Environment variable support

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Git

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd backend-wizards-stage0
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your information:

```env
PORT=3000
USER_EMAIL=your.email@example.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express
```

## 🏃 Running Locally

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### GET /me

Returns profile information with a dynamic cat fact.

**Response Format:**

```json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-16T12:34:56.789Z",
  "fact": "Cats have over 20 vocalizations, including the purr, meow, and chirp."
}
```

**Status Codes:**
- `200 OK` - Successful response
- `500 Internal Server Error` - Server error (with fallback cat fact)

### GET /

Health check endpoint.

**Response:**

```json
{
  "message": "Backend Wizards API is running!",
  "endpoints": {
    "profile": "/me"
  }
}
```

## 🧪 Testing

### Manual Testing

```bash
# Using curl
curl http://localhost:3000/me

# Using httpie
http GET http://localhost:3000/me

# In browser
# Navigate to: http://localhost:3000/me
```

### Automated Testing

```bash
npm test
```

## 📦 Dependencies

- **express** (^4.18.2) - Web framework
- **axios** (^1.6.0) - HTTP client for API requests
- **cors** (^2.8.5) - Enable CORS
- **dotenv** (^16.3.1) - Environment variable management

### Dev Dependencies

- **nodemon** (^3.0.1) - Auto-reload during development

## 🌐 Deployment

### Deployment Options (Vercel and Render NOT allowed)

1. **Railway** - https://railway.app
2. **AWS EC2** - https://aws.amazon.com/ec2
3. **Heroku** - https://heroku.com
4. **DigitalOcean** - https://digitalocean.com
5. **Google Cloud Platform** - https://cloud.google.com

### Railway Deployment Steps

1. Create account on Railway
2. Create new project
3. Connect your GitHub repository
4. Add environment variables in Railway dashboard
5. Deploy!

### Environment Variables for Deployment

Make sure to set these in your hosting platform:

```
PORT=3000
USER_EMAIL=your.email@example.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express
```

## 📝 Project Structure

```
backend-wizards-stage0/
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── .env.example        # Environment variables template
├── .env               # Your environment variables (not committed)
├── .gitignore         # Git ignore rules
├── README.md          # Documentation
└── test.js            # Test script (optional)
```

## 🔒 Error Handling

The application handles various error scenarios:

1. **Cat Facts API Timeout** - 5-second timeout with fallback message
2. **Network Errors** - Graceful degradation with default cat fact
3. **Invalid Endpoints** - 404 response with error message
4. **Server Errors** - 500 response with error details

## 📊 Features Breakdown

### ✅ Dynamic Timestamp
- Generates fresh UTC timestamp on every request
- ISO 8601 format for consistency
- Updates in real-time

### ✅ Cat Facts Integration
- Fetches new cat fact on each request
- No caching - always fresh data
- Graceful fallback if API fails

### ✅ Best Practices
- Environment variable configuration
- CORS headers included
- Request logging for debugging
- Proper error handling
- Clean code structure
- Comprehensive documentation

## 🎯 Acceptance Criteria Status

- ✅ Working GET /me endpoint with 200 OK
- ✅ Exact JSON schema followed
- ✅ All required fields present
- ✅ User object with email, name, stack
- ✅ Dynamic ISO 8601 timestamp
- ✅ Timestamp updates on each request
- ✅ Cat fact from Cat Facts API
- ✅ New fact fetched per request
- ✅ Content-Type: application/json
- ✅ Well-structured, best-practice code

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
# On Linux/Mac:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Cat Facts API Not Responding

The application includes a fallback mechanism. If the external API fails, it returns a default cat fact.

### CORS Issues

CORS is enabled by default. If you encounter issues, check your browser console and ensure the CORS middleware is properly configured.

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Test the endpoint locally before deployment

## 👨‍💻 Author

**Your Name**
- Email: calebawe0@gmail.com
- Stack: Node.js/Express

## 📄 License

MIT License - feel free to use this project for learning purposes.

---

**Built for Backend Wizards Cohort** 🧙‍♂️✨
