import { useState, useEffect } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../api/courses';
import AdminTable from '../components/AdminTable';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { notifySuccess, notifyError } from '../components/Notification';

function CoursesAdmin() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_monthly: '',
    duration_months: '',
  });

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'price_monthly', label: 'Price/Month' },
    { key: 'duration_months', label: 'Duration (Months)' },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const data = await getCourses(page);
        setCourses(data.results || []);
        setTotalPages(Math.ceil(data.count / 20));
      } catch (error) {
        notifyError('Failed to load courses');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCourse) {
        await updateCourse(currentCourse.id, formData);
        notifySuccess('Course updated successfully');
      } else {
        await createCourse(formData);
        notifySuccess('Course created successfully');
      }
      setIsModalOpen(false);
      setCurrentCourse(null);
      setFormData({ title: '', description: '', price_monthly: '', duration_months: '' });
      const data = await getCourses(page);
      setCourses(data.results || []);
    } catch (error) {
      notifyError(error.detail || 'Operation failed');
    }
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price_monthly: course.price_monthly,
      duration_months: course.duration_months,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id);
        notifySuccess('Course deleted successfully');
        const data = await getCourses(page);
        setCourses(data.results || []);
      } catch (error) {
        notifyError(error.detail || 'Failed to delete course');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Manage Courses</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Course</Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <AdminTable
          columns={columns}
          data={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={setPage}
          page={page}
          totalPages={totalPages}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentCourse(null);
          setFormData({ title: '', description: '', price_monthly: '', duration_months: '' });
        }}
        title={currentCourse ? 'Edit Course' : 'Add Course'}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray mb-2">Price/Month</label>
            <input
              type="number"
              value={formData.price_monthly}
              onChange={(e) => setFormData({ ...formData, price_monthly: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray mb-2">Duration (Months)</label>
            <input
              type="number"
              value={formData.duration_months}
              onChange={(e) => setFormData({ ...formData, duration_months: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <Button type="submit">{currentCourse ? 'Update' : 'Create'}</Button>
        </form>
      </Modal>
    </div>
  );
}

export default CoursesAdmin;