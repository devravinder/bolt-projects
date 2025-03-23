import React from 'react';
import { Play, Clock, BookOpen } from 'lucide-react';
import { Course } from '../types';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
  onClick: (courseId: string) => void;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <div className="relative h-48">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{course.lessons} lessons</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="ml-2 text-sm text-gray-600">{course.progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}