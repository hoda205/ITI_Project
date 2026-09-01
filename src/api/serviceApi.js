import { API_URL } from "./config";

export async function getServiceDetails(id="branch-001") {
  try {
    const [servicesResponse, offeredServicesResponse, reviewsResponse] =
      await Promise.all([
        fetch(`${API_URL}/services/${id}`),
        fetch(`${API_URL}/offeredServices?serviceId=${id}`),
        fetch(`${API_URL}/reviews?serviceId=${id}`),
      ]);

    if (
      !servicesResponse.ok ||
      !offeredServicesResponse.ok ||
      !reviewsResponse.ok
    ) {
      throw new Error("Faild to fetch service details");
    }

    const service = await servicesResponse.json();
    const offeredServices = await offeredServicesResponse.json();
    const reviews = await reviewsResponse.json();

    // console.log(`service:`,service)
    // console.log(`offer: `, offeredServices)
    // console.log(`review:` ,reviews)
    const result = {service, offeredServices, reviews};
    console.log(result)
    return {service, offeredServices, reviews};
    
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
export async function getServices(){
  try {
    const servicesResponse = await fetch(`${API_URL}/services`);

    if (!servicesResponse.ok ) {
      throw new Error("Faild to fetch service details");
    }

    const services = await servicesResponse.json();

    // const result = services;
    // console.log(result)
    return services;
    
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
