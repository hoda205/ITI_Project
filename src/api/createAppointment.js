import { API_URL } from "./config";
export async function createAppointment(appointmentData) {
  try {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      throw new Error("Failed to create appointment");
    }

    let app = await response.json();
    // console.log(app)
    return app;
  } catch (error) {
    console.error("Create Appointment Error:", error.message);
    throw error;
  }
}
