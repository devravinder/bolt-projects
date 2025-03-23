import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import CategoryFilter from '../components/CategoryFilter';
import { courses } from '../data/mockData';
import { GraduationCap, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">50+</h3>
              <p className="text-sm text-gray-500">Available Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">2,000+</h3>
              <p className="text-sm text-gray-500">Active Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">95%</h3>
              <p className="text-sm text-gray-500">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore Courses</h2>
      
      <CategoryFilter 
        selected={selectedCategory} 
        onSelect={setSelectedCategory} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            onClick={() => {}}
          />
        ))}
      </div>
    </main>
  );
}