import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { RootState } from '../store';
import { enrollCourse } from '../store/userSlice';

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state: RootState) =>
    state.courses.courses.find(c => c.id === Number(id))
  );
  const [expandedWeek, setExpandedWeek] = React.useState<number | null>(null);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleEnroll = () => {
    dispatch(enrollCourse({
      ...course,
      progress: 0,
      completed: false
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
        <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Course Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Duration:</span> {course.duration}</p>
            <p><span className="font-medium">Schedule:</span> {course.schedule}</p>
            <p><span className="font-medium">Location:</span> {course.location}</p>
            <p><span className="font-medium">Status:</span> {course.enrollmentStatus}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
          <ul className="list-disc list-inside space-y-1">
            {course.prerequisites.map((prereq, index) => (
              <li key={index} className="text-gray-700">{prereq}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Course Description</h2>
        <p className="text-gray-700">{course.description}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Syllabus</h2>
        <div className="space-y-4">
          {course.syllabus.map((week) => (
            <div key={week.week} className="border rounded-lg">
              <button
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
              >
                <span className="font-medium">Week {week.week}: {week.topic}</span>
                {expandedWeek === week.week ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedWeek === week.week && (
                <div className="px-4 py-3 bg-gray-50">
                  <p className="text-gray-700">{week.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleEnroll}
        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
        disabled={course.enrollmentStatus === 'Closed'}
      >
        {course.enrollmentStatus === 'Closed' ? 'Enrollment Closed' : 'Enroll Now'}
      </button>
    </div>
  );
};

export default CourseDetails;