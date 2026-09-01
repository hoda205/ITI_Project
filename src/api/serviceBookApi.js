import { API_URL } from "./config";

export async function getBookingData(serviceId="branch-001", offeredServiceId="offered-001") {
  try {
    const [servicesResponse, offeredServicesResponse] =
      await Promise.all([
        fetch(`${API_URL}/services/${serviceId}`),
        fetch(`${API_URL}/offeredServices/${offeredServiceId}`),
      ]);

    if (
      !servicesResponse.ok ||
      !offeredServicesResponse.ok 
    ) {
      throw new Error("Faild to fetch Booking Data");
    }

    const service = await servicesResponse.json();
    const offeredServices = await offeredServicesResponse.json();

    // console.log(`service:`,service)
    // console.log(`offer: `, offeredServices)
    const result = {service, offeredServices};
    console.log(result)
    return {service, offeredServices};
    
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
