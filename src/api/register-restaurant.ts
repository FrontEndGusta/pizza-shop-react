import { api } from "@/lib/axios";
export interface registerRestaurantBody {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: number;
}
export async function registerRestaurant({
  email,
  restaurantName,
  managerName,
  phone,
}: registerRestaurantBody) {
  await api.post("/restaurants", {
    email,
    restaurantName,
    managerName,
    phone,
  });
}
