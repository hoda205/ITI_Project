import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // 1. استيراد useNavigate
import ServiceCard from '../components/booking/ServiceCard';
import DatePicker from '../components/booking/DatePicker';
import TimeSlotPicker from '../components/booking/TimeSlotPicker';
import UserInfoForm from '../components/booking/UserInfoForm';
import BookingSummary from '../components/booking/BookingSummary';
import { getBookingData } from '../api/serviceBookApi';
import Loading from '../components/common/Loader/Loading';
import Error from '../components/common/Error/Error';
import { createAppointment } from '../api/createAppointment';
import { getAppointments } from '../api/appointmentsByOfferedServiceId';

export default function BookingPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const serviceId = searchParams.get("serviceId");
    const offeredServiceId = searchParams.get("offeredServiceId");
    const [data, setData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const serviceData = await getBookingData(serviceId, offeredServiceId);
                const approintsData = await getAppointments(serviceId, offeredServiceId);
                setData(serviceData);
                setAppointments(approintsData);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [serviceId, offeredServiceId]);


    if (isLoading) {
        return (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Loading />
            </div>
        );
    }

    if (errorMessage || !data?.service) {
        return <Error message={errorMessage || "Failed to load service details"} />;
    }

    const { service, offeredServices = [] } = data;

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = () => {
        return (
            formData.fullName.trim().length >= 3 &&
            /^(\+?20|0)?1[0125][0-9]{8}$/.test(formData.phone.replace(/\s+/g, '')) &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        );
    };
    const isFormComplete = selectedDate && selectedTime && formData.fullName && formData.phone && formData.email;

    const handleConfirm = async () => {
    try {
        const appointment = {
            serviceId: service.id,
            offeredServiceId: offeredServiceId,
            serviceName: service.name,
            date: selectedDate.toISOString().split('T')[0],
            time: selectedTime,
            user: formData,
            status: 'waiting',
            createdAt: new Date().toISOString()
        };

        const newAppointment = await createAppointment(appointment);
        console.log(newAppointment);
        // التوجيه لصفحة الطابور بالبيانات الجديدة
        navigate(`/queue?offeredServiceId=${offeredServiceId}&appointmentId=${newAppointment.id}`);
    } catch (error) {
        console.error("Booking failed:", error);
    }
};

    const handleChangeService = () => {
        navigate(`/services/${serviceId}`);
    };


    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-7">
                <div className="flex-1 min-w-0 space-y-6">
                    {/* 4. تمرير دالة التوجيه هنا */}
                    <ServiceCard
                        service={offeredServices}
                        onEdit={handleChangeService}
                    />

                    <DatePicker
                        selectedDate={selectedDate}
                        onSelectDate={handleDateSelect}
                        workingHours={service.workingHours}
                    />

                    <TimeSlotPicker
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onSelectTime={setSelectedTime}
                        workingHours={service.workingHours}
                        existingAppointments={appointments}
                    />

                    <UserInfoForm
                        formData={formData}
                        onChange={handleInputChange}
                        errors={errors}
                        setErrors={setErrors}
                    />

                    <div className="lg:hidden">
                        <button
                            disabled={!isFormComplete}
                            onClick={handleConfirm}
                            className={`w-full py-4 text-sm font-bold text-white rounded-xl transition-all ${!isFormComplete
                                ? 'bg-slate-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:brightness-90 shadow-lg shadow-blue-600/30'
                                }`}
                        >
                            Confirm Appointment →
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block w-80 shrink-0">
                    <BookingSummary
                        service={offeredServices}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onConfirm={handleConfirm}
                        disabled={!isFormComplete}
                    />
                </div>
            </div>
        </div>
    );
}