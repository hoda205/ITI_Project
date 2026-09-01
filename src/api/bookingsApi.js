import { API_URL } from "./config"; // تأكدي أن مساره صحيح (مثلاً http://localhost:3000)

// جلب جميع الحجوزات
export async function getAllBookings() {
  try {
    const res = await fetch(`${API_URL}/appointments`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return await res.json();
  } catch (error) {
    console.error("Error in getAllBookings:", error.message);
    throw error;
  }
}

// إلغاء حجز معين
export async function cancelBooking(id) {
  try {
    const res = await fetch(`${API_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    if (!res.ok) throw new Error("Failed to cancel booking");
    return await res.json();
  } catch (error) {
    console.error("Error in cancelBooking:", error.message);
    throw error;
  }
}