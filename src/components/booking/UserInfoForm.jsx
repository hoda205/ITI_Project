import { useState } from 'react';
import { User, Phone, Mail, AlertCircle } from 'lucide-react';

export default function UserInfoForm({ formData, onChange, errors = {}, setErrors }) {
    // التحقق الموضعي لكل حقل
    const validateField = (name, value) => {
        let error = '';

        if (name === 'fullName') {
            if (!value.trim()) {
                error = 'Full name is required';
            } else if (value.trim().length < 3) {
                error = 'Name must be at least 3 characters';
            }
        }

        if (name === 'phone') {
            // التحقق من رقم الهاتف (يقبل الأرقام وصيغة +20 أو الأرقام المصرية/الدولية)
            const phoneRegex = /^(\+?20|0)?1[0125][0-9]{8}$/;
            if (!value.trim()) {
                error = 'Phone number is required';
            } else if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
                error = 'Please enter a valid phone number (e.g. 01012345678)';
            }
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value.trim()) {
                error = 'Email address is required';
            } else if (!emailRegex.test(value.trim())) {
                error = 'Please enter a valid email address';
            }
        }

        if (setErrors) {
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleChange = (e) => {
        onChange(e);
        // مسح الخطأ أثناء كتابة المستخدم لتجربة استخدام أفضل
        if (errors[e.target.name] && setErrors) {
            setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-bold mb-1.5 text-slate-900">Your Information</h3>
            <p className="text-sm mb-5 text-slate-500">
                We'll use these details to send your confirmation and queue updates.
            </p>

            <div className="space-y-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-900">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.fullName ? 'text-red-500' : 'text-slate-400'}`}>
                            <User size={16} strokeWidth={1.75} />
                        </span>
                        <input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Huda Magdy"
                            className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white text-slate-900 outline-none transition-all ${
                                errors.fullName
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                                    : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-50'
                            }`}
                            type="text"
                        />
                    </div>
                    {errors.fullName && (
                        <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-medium">
                            <AlertCircle size={12} /> {errors.fullName}
                        </p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-900">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.phone ? 'text-red-500' : 'text-slate-400'}`}>
                            <Phone size={16} strokeWidth={1.75} />
                        </span>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="+20 10 0000 0000"
                            className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white text-slate-900 outline-none transition-all ${
                                errors.phone
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                                    : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-50'
                            }`}
                            type="tel"
                        />
                    </div>
                    {errors.phone && (
                        <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-medium">
                            <AlertCircle size={12} /> {errors.phone}
                        </p>
                    )}
                </div>

                {/* Email Address */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5 text-slate-900">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-500' : 'text-slate-400'}`}>
                            <Mail size={16} strokeWidth={1.75} />
                        </span>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="huda@example.com"
                            className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border bg-white text-slate-900 outline-none transition-all ${
                                errors.email
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-100'
                                    : 'border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-50'
                            }`}
                            type="email"
                        />
                    </div>
                    {errors.email && (
                        <p className="flex items-center gap-1 mt-1.5 text-xs text-red-500 font-medium">
                            <AlertCircle size={12} /> {errors.email}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}