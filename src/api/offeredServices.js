import { API_URL } from "./config";

export async function getofferedServices(){
  try {
    const offeredServicesResponse = await fetch(`${API_URL}/offeredServices`);

    if (!offeredServicesResponse.ok ) {
      throw new Error("Faild to fetch offeredServices details");
    }

    const offeredServices = await offeredServicesResponse.json();

    // const result = services;
    // console.log(result)
    return offeredServices;
    
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}