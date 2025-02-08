# Course Management System

A modern full-stack platform designed to streamline course enrollment and real-time interactions. Built with an advanced tech stack, it allows users to explore courses, enroll, and engage through real-time updates.

## Key Features

- 📚 **Explore Courses**: View available courses with details like instructor, schedule, and syllabus
- ❤️ **Real-Time Course Likes**: Like courses and see instant updates via WebSockets
- 🎨 **Modern UI**: Responsive and interactive design using React and Tailwind CSS
- 🔐 **Secure API**: Built with Node.js and Express.js for efficient backend operations

## Tech Stack

### Frontend
- ⚛️ React
- 🔗 Redux Toolkit
- 🚏 React Router
- 🎨 Tailwind CSS
- 🔗 Axios

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🔌 WebSockets (ws)
- 🌍 CORS

## Installation & Setup

### Prerequisites
- ⚙️ Node.js (>= 16.x)
- 📦 npm or yarn

### Steps to Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/tivarii/CourseHub.git
   cd CourseHub
   ```

2. Install dependencies:

   Frontend:
   ```bash
   cd project
   npm install
   ```

   Backend:
   ```bash
   cd server
   npm install
   ```

### Running the Project

Start the Backend Server:
```bash
cd server
node src/index.js
```

Start the Frontend:
```bash
cd project
npm run dev
```

🔗 The frontend will be running at http://localhost:5173 (default Vite port)

## API Endpoints

### 📥 Get All Courses
```
GET /api/courses
```
Returns a list of available courses.

### ❤️ Like a Course
```
POST /api/courses/:id/like
```
Increments the like count of a course by its id.

## WebSocket Implementation

WebSockets are used to update the like count in real-time. The backend broadcasts updates to all connected clients whenever a course is liked.

## Folder Structure

```
CourseHub/
├── project/          # Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
├── server/           # Backend
│   ├── src/
│   │   ├── index.js
│   ├── package.json
│   ├── README.md
```

## Future Enhancements

- 📊 **Admin Dashboard**: Manage courses and enrollments efficiently
- 📈 **Analytics Dashboard**: Track course popularity and engagement
- 🔒 **User Authentication**: Secure login and user roles
- 💳 **Payment Integration**: Enable paid course enrollments

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request

## Contact

- 📩 Email: adarshtiwati3576@gmail.com
- 🔗 GitHub: [Adarsh-Tiwari](https://github.com/Adarsh-Tiwari)

🚀 Happy Learning with Course Management System!

