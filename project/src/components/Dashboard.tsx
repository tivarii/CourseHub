import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { markCompleted, updateProgress } from '../store/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector((state: RootState) => state.user.enrolledCourses);

  const handleMarkCompleted = (courseId: number) => {
    dispatch(markCompleted(courseId));
  };

  const handleUpdateProgress = (courseId: number, progress: number) => {
    dispatch(updateProgress({ courseId, progress }));
  };

  if (enrolledCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No Enrolled Courses</h2>
        <p className="text-gray-600">Start exploring courses and enroll to see them here!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Courses</h1>
      <div className="grid grid-cols-1 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-4">
              <img
                src={course.thumbnail}
                alt={course.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-500 mb-4">{course.duration}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {!course.completed && (
                    <>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={course.progress}
                        onChange={(e) => handleUpdateProgress(course.id, parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <button
                        onClick={() => handleMarkCompleted(course.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Mark as Completed
                      </button>
                    </>
                  )}
                  {course.completed && (
                    <span className="text-green-600 font-medium">Course Completed! 🎉</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;