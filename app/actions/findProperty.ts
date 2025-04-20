import Property from "@/models/Property";

//f// * Find property in data base and return it
export default async function findPropertyByOwner(propertyId, userId) {
  const property = await Property.findById(propertyId);
  if (!property || property._id.toString() !== propertyId) throw new Error("Unable to find property");
  if (property.owner.toString() !== userId) throw new Error("Unothorized! This is not your property");

  return property;
}
