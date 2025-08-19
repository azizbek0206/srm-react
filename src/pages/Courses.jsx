import { useState, useEffect } from 'react';
import { getCourses } from '../api/courses';
import Card from '../components/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { notifyError } from '../components/Notification';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const data = await getCourses(page, search);
        setCourses(data.results || []);
        setTotalPages(Math.ceil(data.count / 20)); // Assuming page_size=20
      } catch (error) {
        notifyError('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [page, search]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Courses</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
          <div className="flex justify-between mt-6">
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <span>Page {page} of {totalPages}</span>
            <Button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Courses;