import { Course, Lesson } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    duration: '12 hours',
    lessons: 24,
    progress: 0,
    category: 'Programming'
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    description: 'Master the art of digital marketing with practical strategies and real-world examples.',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    duration: '15 hours',
    lessons: 30,
    progress: 0,
    category: 'Marketing'
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    description: 'Explore the basics of data science, statistics, and machine learning.',
    instructor: 'Emily Rodriguez',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    duration: '20 hours',
    lessons: 40,
    progress: 0,
    category: 'Data Science'
  }
];

export const lessons: Record<string, Lesson[]> = {
  '1': [
    {
      id: '1-1',
      title: 'HTML Basics',
      duration: '30 min',
      completed: false,
      videoUrl: 'https://example.com/video1'
    },
    {
      id: '1-2',
      title: 'CSS Fundamentals',
      duration: '45 min',
      completed: false,
      videoUrl: 'https://example.com/video2'
    }
  ]
};