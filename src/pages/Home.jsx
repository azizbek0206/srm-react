import { useState, useEffect } from 'react';
import { getCourses } from '../api/courses';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { notifyError } from '../components/Notification';

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.results || []);
      } catch (error) {
        notifyError('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Welcome to EduMaster CRM</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              description={course.description}
            >
              <p className="text-gray">Price: ${course.price_monthly}/month</p>
              <p className="text-gray">Duration: {course.duration_months} months</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;