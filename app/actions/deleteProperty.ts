"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionuser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteProperty(propertyId) {
  const session = await getSessionUser();

  if (!session?.user || !session?.userId) throw new Error("Invalide session");
  const { userId } = session;

  await connectDB();

  const property = await Property.findOne({ _id: propertyId });
  if (!property || property._id.toString() !== propertyId) throw new Error("Unable to find property");
  if (property.owner.toString() !== userId) throw new Error("Unothorized! This is not your property");

  property.images.map(async (imageUrl) => {
    console.log("imageUrl: ", imageUrl);
    const parts = imageUrl.split("/");
    const imageId = parts.at(-1).split(".").at(0);
    await cloudinary.uploader.destroy("Rently/" + imageId).then((result) => {
      if (result !== 'ok') throw new Error('Could not remove images')
    });
  });

  await Property.deleteOne({ _id: propertyId });
  revalidatePath("/", "layout");
}
