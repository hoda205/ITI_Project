import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceDetails } from "../api/serviceApi";

// Lucide Icons
import { Building2, Shield, Bell, Activity, Calendar, Star, Clock, Users } from 'lucide-react';

// Common Components
import Loading from "../components/common/Loader/Loading";
import Error from "../components/common/Error/Error";
import Breadcrumb from "../components/common/Breadcrumb";
import Tabs from "../components/common/Tabs";

// Service Details Components
import BranchHero from "../components/serviceDetails/BranchHero";
import OverviewTab from "../components/serviceDetails/Overview/OverviewTab";
import AvailableServices from "../components/serviceDetails/AvailableServices/AvailableServices";
import ReviewsTab from "../components/serviceDetails/Reviews/ReviewsTab";
import HoursAndInfoTab from "../components/serviceDetails/HoursAndInfo/HoursAndInfoTab";
import { checkIsOpenNow } from "../utils/checkIsOpenNow";

export default function ServiceDetails() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                setErrorMessage(null);

                const serviceData = await getServiceDetails(id);
                setData(serviceData);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [id]);

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

    
    
    const { service, offeredServices = [], reviews = [] } = data;
    
    const isOpenNow = checkIsOpenNow(service.workingHours);
    // console.log("isOpenNow: " ,isOpenNow)
    const breadcrumbItems = [
        { label: "Home", link: "/" },
        { label: "Services", link: "/services" },
        { label: service.name },
    ];

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "services", label: "Available Services" },
        { id: "reviews", label: "Reviews" },
        { id: "hours", label: "Hours & Info" },
    ];

    // Stats Data 
    const statsData = [
        {
            label: "Served Today",
            value: service.servedToday ?? 0,
            icon: Users,
            bgClass: "bg-blue-50",
            textClass: "text-blue-600",
        },
        {
            label: "Avg. Wait Time",
            value: `${service.averageWaitTime ?? 0} min`,
            icon: Clock,
            bgClass: "bg-green-50",
            textClass: "text-green-600",
        },
        {
            label: "Rating",
            value: `${service.rating ?? 0} / 5`,
            icon: Star,
            bgClass: "bg-amber-50",
            textClass: "text-amber-600",
        },
        {
            label: "Appointments",
            value: isOpenNow ? "Open" : "Closed",
            icon: Calendar,
            bgClass: "bg-purple-50",
            textClass: "text-purple-600",
        },
    ];

    // 4. تهيئة قائمة الخدمات المتاحة (ديناميكي بالكامل مع slotsAvailable والصور)
    const iconsPool = [Building2, Shield, Bell, Activity];
    const colorsPool = [
        { bg: "bg-blue-50", text: "text-blue-600", btn: "bg-blue-600" },
        { bg: "bg-purple-50", text: "text-purple-600", btn: "bg-purple-600" },
        { bg: "bg-green-50", text: "text-green-600", btn: "bg-green-600" },
        { bg: "bg-amber-50", text: "text-amber-600", btn: "bg-amber-600" },
    ];

    const formattedOfferedServices = offeredServices.map((item, index) => {
        const color = colorsPool[index % colorsPool.length];
        return {
            ...item,
            title: item.name,
            duration: `${item.duration} min`,
            slotsAvailable: item.slotsAvailable ?? 0,
            badgeText: item.available ? "Today" : "Unavailable",
            isToday: item.available,
            badgeBgClass: item.available ? "bg-green-100" : "bg-slate-100",
            badgeColorClass: item.available ? "text-green-700" : "text-slate-500",
            image: item.image || service.image,
            icon: iconsPool[index %  iconsPool.length],
            iconBgClass: color.bg,
            iconColorClass: color.text,
            buttonBgClass: color.btn,
        };
    });

    // 5. تهيئة التقييمات وقراءة نسب التوزيع من الـ API
    const formattedReviews = reviews.map((r, i) => ({
        id: r.id,
        userName: r.userName || `User ${i + 1}`,
        userAvatar: r.userAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
        rating: r.rating,
        date: r.date,
        comment: r.comment,
    }));

    // قراءة ratingDistribution من الـ API
    const dist = service.ratingDistribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const reviewsBreakdown = {
        average: service.rating ?? 0,
        totalCount: service.totalReviews ?? reviews.length,
        distribution: [
            { stars: 5, percentage: dist["5"] ?? 0 },
            { stars: 4, percentage: dist["4"] ?? 0 },
            { stars: 3, percentage: dist["3"] ?? 0 },
            { stars: 2, percentage: dist["2"] ?? 0 },
            { stars: 1, percentage: dist["1"] ?? 0 },
        ],
    };

    // 6. تحويل مواعيد العمل (workingHours) ديناميكياً
    const daysMap = [
        { key: "sunday", name: "Sunday" },
        { key: "monday", name: "Monday" },
        { key: "tuesday", name: "Tuesday" },
        { key: "wednesday", name: "Wednesday" },
        { key: "thursday", name: "Thursday" },
        { key: "friday", name: "Friday" },
        { key: "saturday", name: "Saturday" },
    ];

    const currentDayKey = daysMap[new Date().getDay()].key;

    const formattedWorkingHours = daysMap.map((d) => {
        const dayData = service.workingHours?.[d.key];
        const isClosed = !dayData?.isOpen;
        const isToday = d.key === currentDayKey;

        return {
            day: d.name,
            time: isClosed ? "Closed" : `${dayData.open} AM – ${dayData.close} PM`,
            isClosed,
            isToday,
        };
    });

    // صور المعرض من الـ API
    const branchPhotos = service.photos && service.photos.length > 0
        ? service.photos
        : [service.image];

        
    return (
        <div className="min-h-screen bg-slate-50">
            {/* 1. Breadcrumbs */}
            <Breadcrumb items={breadcrumbItems} />

            {/* 2. Hero Section */}
            <BranchHero
                branch={{
                    name: service.name,
                    category: service.category || "General",
                    rating: service.rating || 0,
                    reviewsCount: service.totalReviews || reviews.length,
                    address: service.contact?.address || "Address not provided",
                    statusText: isOpenNow ? "Open now" : "Closed now",
                    image: service.image,
                    isOpenNow,
                }}
            />

            {/* 3. Main Content & Sidebar */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <OverviewTab
                                aboutText={{
                                    title: `About ${service.name}`,
                                    description: service.description,
                                    highlightText: service.highlightText,
                                }}
                                stats={statsData}
                                photos={branchPhotos}
                                reviewsData={{
                                    breakdown: reviewsBreakdown,
                                    list: formattedReviews,
                                }}
                                onSeeAllReviews={() => setActiveTab("reviews")}
                                isOpenNow={isOpenNow}
                            />
                        )}

                        {/* Available Services Tab */}
                        {activeTab === "services" && (
                            <AvailableServices
                                services={formattedOfferedServices}
                                onSelectService={(selectedService) => {
                                    console.log("Book clicked for:", selectedService);
                                }}
                            />
                        )}

                        {/* Reviews Tab */}
                        {activeTab === "reviews" && (
                            <ReviewsTab
                                averageRating={service.rating}
                                totalReviews={service.totalReviews || reviews.length}
                                reviews={formattedReviews}
                            />
                        )}

                        {/* Hours & Info Tab */}
                        {activeTab === "hours" && (
                            <HoursAndInfoTab
                                hours={formattedWorkingHours}
                                contact={[
                                    { label: "Address", value: service.contact?.address },
                                    { label: "Phone", value: service.contact?.phone },
                                    { label: "Email", value: service.contact?.email },
                                ]}
                                branchName={service.name}
                                branchSubtitle={service.contact?.address}
                                mapUrl={service.contact?.mapUrl}
                            />
                        )}
                    </div>

                </div>
            </main>

            {/* Mobile Sticky CTA */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-slate-200 bg-white shadow-2xl">
                <button
                    onClick={() => setActiveTab("services")}
                    className="w-full py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    Choose a Service
                </button>
            </div>
        </div>
    );
}