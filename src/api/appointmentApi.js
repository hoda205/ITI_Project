import { API_URL } from "./config";
export async function getAppointmentById(id) {
  try {
    const res = await fetch(
      `${API_URL}/appointments/${id}`,
    );
    if (!res.ok) throw new Error("Failed to fetch queue data");
    return await res.json();
  } catch (error) {
    console.error("Queue API Error:", error.message);
    throw error;
  }
}
export async function cancelAppointment(appointmentId) {
  try {
    const res = await fetch(`${API_URL}/appointments/${appointmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    if (!res.ok) throw new Error("Failed to cancel appointment");
    return await res.json();
  } catch (error) {
    console.error("Cancel Error:", error.message);
    throw error;
  }
}
