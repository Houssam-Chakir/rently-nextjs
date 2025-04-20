"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionuser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Adds a new property to the database using the form data provided.
 * @param {FormData} formData - The form data containing information about the property.
 * @returns None
 */

/**
 * Adds a new property to the database based on the provided form data.
 *
 * @param formData - The form data containing property details, including type, name, description, location, amenities, rates, seller information, and images.
 *
 * @throws {Error} If the user session is invalid or the user ID is missing.
 * @throws {Error} If an invalid image file is encountered during processing.
 *
 * @remarks
 * - This function connects to the database, retrieves the current session user, and validates the user ID.
 * - It processes the form data to extract property details, including amenities and images.
 * - Images are uploaded to Cloudinary, and their URLs are stored in the database.
 * - The property data is saved to the database, and the user is redirected to the newly created property's page.
 *
 * await addProperty(formData);
 * ```
 */
export default async function addProperty(formData: FormData) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) throw new Error("User ID is required");
  const { userId } = sessionUser;

  // Get all selected amenities from the form data.
  const amenities = formData.getAll("amenities");
  console.log("formData: ", formData);
  console.log("amenities: ", amenities);

  // Get all images from the form data, filter out any non-file or empty file name entries, and extract the file names.
  const images = formData.getAll("images").filter((image) => image instanceof File && image.name !== "");

  // Construct the property data object to be saved to the database.
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
    amenities,
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
    images: [] as string[], // Initialize images as an empty array with explicit type
  };

  const imageUrls = [];

  // Iterate over each image file to upload it to Cloudinary.
  for (const imageFile of images) {
    // Check if the imageFile is a valid File object.  If not, throw an error.
    if (!(imageFile instanceof File)) {
      throw new Error("Invalid image file");
    }
    // Convert the image file to an ArrayBuffer.
    const imageBuffer = await imageFile.arrayBuffer();
    // Create a Uint8Array from the ArrayBuffer.
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    // Create a Buffer from the Uint8Array.
    const imageData = Buffer.from(imageArray);
    // Convert the image data to a base64 string.
    const imageBase64 = imageData.toString("base64");
    // Upload the image to Cloudinary.
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: "Rently",
    });
    // Push the secure URL of the uploaded image to the imageUrls array.
    imageUrls.push(result.secure_url);
  }

  // Assign the array of image URLs to the propertyData object.
  propertyData.images = imageUrls;

  // Create a new Property instance with the collected property data.
  const newProperty = new Property(propertyData);
  // Save the new property to the database.
  await newProperty.save();

  // Revalidate the root path to update the cache.
  revalidatePath("/", "layout");
  // Redirect the user to the newly created property's page.
  redirect(`/properties/${newProperty._id.toString()}`);
}
