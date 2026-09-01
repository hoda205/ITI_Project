import { API_URL } from "./config";

export async function getAppointments(serviceId,offeredServiceId) {
  try {
    const appointmentsRes = await fetch(`${API_URL}/appointments?serviceId=${serviceId}&&offeredServiceId=${offeredServiceId}`);
    if (!appointmentsRes.ok) {
      throw new Error("Failed to fetch Appointments");
    }

    const appointments = await appointmentsRes.json();
    console.log(appointments);  
    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    throw error;
  }
}