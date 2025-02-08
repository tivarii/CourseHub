import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { AppDispatch, RootState } from '../store';
import { fetchCourses, updateCourseLikes,updateLikes } from '../store/coursesSlice';
import { Course } from '../types';

const CourseList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading } = useSelector((state: RootState) => state.courses);
  const [search, setSearch] = useState('');

  
  useEffect(() => {
    try{
      dispatch(fetchCourses());

      // Set up WebSocket connection
      const ws = new WebSocket('ws://localhost:8080');
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'LIKE_UPDATE') {
          dispatch(updateLikes({ courseId: data.courseId, likes: data.likes }));
        }
      };
  
      return () => {
        ws.close();
      };
    }catch(err){
      console.error(err);
    }
    
  }, [dispatch]);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Loading courses...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses or instructors..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course: Course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
              <p className="text-sm text-gray-500 mb-4">{course.duration}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  course.enrollmentStatus === 'Open'
                    ? 'bg-green-100 text-green-800'
                    : course.enrollmentStatus === 'In Progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {course.enrollmentStatus}
                </span>
                
                <button
                  onClick={() => dispatch(updateCourseLikes(course.id))}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                >
                  <Heart className="h-5 w-5" />
                  <span>{course.likes}</span>
                </button>
              </div>

              <Link
                to={`/course/${course.id}`}
                className="mt-4 block text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;