import { useState, useEffect, useMemo } from 'react';
import BookingsHeader from '../components/bookings/BookingsHeader';
import BookingsList from '../components/bookings/BookingsList';
import { getAllBookings, cancelBooking } from '../api/bookingsApi';
import { getServices } from '../api/serviceApi';
import Loading from '../components/common/Loader/Loading';
import Error from '../components/common/Error/Error';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
      const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      // جلب الحجوزات والفروع في نفس الوقت
      const [bookingsData, servicesData] = await Promise.all([
        getAllBookings(),
        getServices(),
      ]);

      setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

    fetchBookings();
  }, []);

  // دمج بيانات الحجز مع تفاصيل الخدمة والفرع المقابل
  const enrichedBookings = useMemo(() => {
    return bookings.map((booking) => {
      const branch = services.find((s) => s.id === booking.serviceId);
      const offered = branch?.offeredServices?.find(
        (o) => o.id === booking.offeredServiceId
      );

      return {
        ...booking,
        image: offered?.image || branch?.image || booking.image,
        category: branch?.category || booking.category || 'Services',
        branchName: branch?.name || booking.branchName || 'Main Branch',
        location: branch?.contact?.address || branch?.location || booking.location,
        duration: offered?.duration || booking.duration || 15,
        serviceName: offered?.name || booking.serviceName || branch?.name,
      };
    });
  }, [bookings, services]);

  // حساب الإحصائيات (Upcoming, Past, Cancelled)
  const stats = useMemo(() => {
    const upcoming = enrichedBookings.filter(
      (b) => b.status === 'waiting' || b.status === 'confirmed'
    ).length;
    const past = enrichedBookings.filter((b) => b.status === 'completed').length;
    const cancelled = enrichedBookings.filter((b) => b.status === 'cancelled').length;

    return { upcoming, past, cancelled };
  }, [enrichedBookings]);

  // تصفية الحجوزات حسب التبويب النشط
  const filteredBookings = useMemo(() => {
    if (activeTab === 'upcoming') {
      return enrichedBookings.filter(
        (b) => b.status === 'waiting' || b.status === 'confirmed'
      );
    }
    if (activeTab === 'past') {
      return enrichedBookings.filter((b) => b.status === 'completed');
    }
    if (activeTab === 'cancelled') {
      return enrichedBookings.filter((b) => b.status === 'cancelled');
    }
    return enrichedBookings;
  }, [enrichedBookings, activeTab]);

  // إلغاء الحجز وتحديث الحالة محلياً
  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await cancelBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
      );
    } catch (err) {
      alert('Failed to cancel appointment: ' + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (errorMessage) {
    return <Error message={errorMessage} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <BookingsHeader
        stats={stats}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <BookingsList
          bookings={filteredBookings}
          onCancel={handleCancelBooking}
        />
      </main>
    </div>
  );
}