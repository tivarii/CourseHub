const express = require('express');
const { WebSocketServer } = require('ws'); // Import WebSocketServer correctly
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage for courses
let courses = [
  {
    id: 1,
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      }
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com'
      },
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com'
      }
    ],
    likes: 0
  },
  {
    id: 2,
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      }
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        progress: 0,
        completed: false
      }
    ],
    likes: 150
  },
  {
    id: 3,
    name: 'Advanced Web Development',
    instructor: 'Jane Smith',
    description: 'Master modern web development techniques and best practices.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    duration: '12 weeks',
    schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['HTML/CSS', 'JavaScript', 'Basic React'],
    syllabus: [
      {
        week: 1,
        topic: 'Modern JavaScript',
        content: 'ES6+, TypeScript, and modern JavaScript patterns.'
      },
      {
        week: 2,
        topic: 'Advanced React',
        content: 'React Hooks, Context API, and Performance Optimization.'
      }
    ],
    students: [
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com',
        progress: 0,
        completed: false
      }
    ],
    likes: 230
  },
  {
    id: 4,
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      }
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        progress: 0,
        completed: false
      }
    ],
    likes: 150
  },
  {
    id: 5,
    name: 'Advanced Web Development',
    instructor: 'Jane Smith',
    description: 'Master modern web development techniques and best practices.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    duration: '12 weeks',
    schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['HTML/CSS', 'JavaScript', 'Basic React'],
    syllabus: [
      {
        week: 1,
        topic: 'Modern JavaScript',
        content: 'ES6+, TypeScript, and modern JavaScript patterns.'
      },
      {
        week: 2,
        topic: 'Advanced React',
        content: 'React Hooks, Context API, and Performance Optimization.'
      }
    ],
    students: [
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com',
        progress: 0,
        completed: false
      }
    ],
    likes: 230
  },
  {
    id: 6,
    name: 'Introduction to React Native',
    instructor: 'John Doe',
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      }
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        progress: 0,
        completed: false
      }
    ],
    likes: 150
  },
  {
    id: 7,
    name: 'Advanced Web Development',
    instructor: 'Jane Smith',
    description: 'Master modern web development techniques and best practices.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    duration: '12 weeks',
    schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
    location: 'Online',
    prerequisites: ['HTML/CSS', 'JavaScript', 'Basic React'],
    syllabus: [
      {
        week: 1,
        topic: 'Modern JavaScript',
        content: 'ES6+, TypeScript, and modern JavaScript patterns.'
      },
      {
        week: 2,
        topic: 'Advanced React',
        content: 'React Hooks, Context API, and Performance Optimization.'
      }
    ],
    students: [
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com',
        progress: 0,
        completed: false
      }
    ],
    likes: 230
  }
];

// ✅ Correct WebSocket server initialization
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// ✅ Correct function for broadcasting likes update
const broadcastLikesUpdate = (courseId, likes) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // Ensure client is open before sending
      client.send(JSON.stringify({
        type: 'LIKE_UPDATE',
        courseId,
        likes
      }));
    }
  });
};

// API Routes
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

app.post('/api/courses/:id/like', (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find(c => c.id === courseId);

  if (course) {
    course.likes += 1;
    broadcastLikesUpdate(courseId, course.likes);
    res.json({ likes: course.likes });
  } else {
    res.status(404).json({ error: 'Course not found' });
  }
});

// ✅ Correct Express server initialization
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
