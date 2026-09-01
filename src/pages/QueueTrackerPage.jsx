import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import QueueStatusCard from '../components/queue/QueueStatusCard';
import { getAppointmentById, cancelAppointment } from '../api/appointmentApi';
import Loading from '../components/common/Loader/Loading';
import Error from '../components/common/Error/Error';

export default function QueueTrackerPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const offeredServiceId = searchParams.get('offeredServiceId') || 'offered-004';
  const currentAppointmentId = searchParams.get('appointmentId');

  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const data = await getAppointmentById(currentAppointmentId);
        if (Array.isArray(data)) {
          const current = data.find((item) => item.id === currentAppointmentId) || data[0];
          setBooking(current);
        } else {
          setBooking(data);
        }
      } catch (err) {
        setErrorMessage(err.message || 'Failed to load ticket details');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [offeredServiceId, currentAppointmentId]);

  const handleCancel = async () => {
    const isConfirmed = window.confirm('Are you sure you want to cancel this appointment?');
    if (!isConfirmed) return;

    try {
      await cancelAppointment(booking?.id || currentAppointmentId);
      alert('Appointment cancelled successfully.');
      navigate('/services');
    } catch (err) {
      alert('Cancellation failed: ' + (err.message || 'An error occurred'));
    }
  };

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    );
  }

  if (errorMessage || !booking) {
    return <Error message={errorMessage || 'No ticket found'} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 flex items-center justify-center">
      <QueueStatusCard booking={booking} onCancel={handleCancel} />
    </div>
  );
}       