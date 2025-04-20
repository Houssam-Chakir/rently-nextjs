"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import verifySession from "@/utils/verifySession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateProperty = async (propertyId, formData) => {
  console.log("formData: ", formData);

  await connectDB();

  const userId = await verifySession();

  const property = await Property.findById(propertyId);
  if (property.owner.toString() !== userId.toString()) throw new Error("Unothorized action: Not your property");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities: formData.getAll("amenities"),
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  await Property.findByIdAndUpdate(propertyId, propertyData)
  revalidatePath('/', 'layout')
  redirect(`/properties/${propertyId}`)
};

export default updateProperty;
