"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import verifySession from "@/utils/verifySession";
import { revalidatePath } from "next/cache";
import findPropertyByOwner from "./findProperty";

export default async function deleteProperty(propertyId) {
  await connectDB();

  const userId = await verifySession();

  const property = await findPropertyByOwner(propertyId, userId);

  property.images.map(async (imageUrl) => {
    const imageId = getImageId(imageUrl);

    await cloudinary.uploader.destroy("Rently/" + imageId).then((result) => {
      if (result !== "ok") throw new Error("Could not remove images");
    });
  });

  await Property.deleteOne({ _id: propertyId });
  revalidatePath("/", "layout");
}

//f// * Get image ID
async function getImageId(imageUrl) {
  const parts = imageUrl.split("/");
  const imageId = parts.at(-1).split(".").at(0);
  return imageId;
}
