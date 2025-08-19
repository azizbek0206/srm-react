import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { notifySuccess, notifyError } from '../components/Notification';
import { getToken } from '../api/auth';

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    parent_name: '',
    parent_phone: '',
    address: '',
    birth_date: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/students/profile/`,
          {
            headers: { Authorization: `Bearer ${getToken()}` },
          }
        );
        setProfile(response.data);
        setFormData({
          parent_name: response.data.parent_name || '',
          parent_phone: response.data.parent_phone || '',
          address: response.data.address || '',
          birth_date: response.data.birth_date || '',
        });
      } catch (error) {
        notifyError('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/students/profile/`,
        formData,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setProfile({ ...profile, ...formData });
      setIsModalOpen(false);
      notifySuccess('Profile updated successfully');
    } catch (error) {
      notifyError('Failed to update profile');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">My Profile</h1>
      <Card title="Profile Details">
        <p className="text-gray">Parent Name: {profile?.parent_name || 'N/A'}</p>
        <p className="text-gray">Parent Phone: {profile?.parent_phone || 'N/A'}</p>
        <p className="text-gray">Address: {profile?.address || 'N/A'}</p>
        <p className="text-gray">Birth Date: {profile?.birth_date || 'N/A'}</p>
        <Button onClick={() => setIsModalOpen(true)} className="mt-4">
          Edit Profile
        </Button>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray mb-2">Parent Name</label>
            <input
              type="text"
              value={formData.parent_name}
              onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray mb-2">Parent Phone</label>
            <input
              type="text"
              value={formData.parent_phone}
              onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray mb-2">Birth Date</label>
            <input
              type="date"
              value={formData.birth_date}
              onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <Button type="submit">Update</Button>
        </form>
      </Modal>
    </div>
  );
}

export default StudentProfile;