import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle } from 'lucide-react';
import { courses, lessons } from '../data/mockData';

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const course = courses.find(c => c.id === courseId);
  const courseLessons = lessons[courseId || ''] || [];

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Courses
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="relative h-64 md:h-96">
          <img 
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h3>
            <div className="space-y-3">
              {courseLessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center">
                    <Play className="w-5 h-5 text-indigo-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                      <p className="text-sm text-gray-500">{lesson.duration}</p>
                    </div>
                  </div>
                  {lesson.completed && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Instructor</h3>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-600">
                    {course.instructor[0]}
                  </span>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-gray-900">{course.instructor}</h4>
                <p className="text-gray-500">Course Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}