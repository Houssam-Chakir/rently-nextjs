import PropertyType from "@/Types/PropertiesType";

const convertToPlainPropertyObject = (property) => {
  const plainObj: PropertyType = {
    _id: property._id.toString(),
    owner: property.owner.toString(),
    name: property.name,
    type: property.type,
    description: property.description,
    location: property.location,
    beds: property.beds,
    baths: property.baths,
    square_feet: property.square_feet,
    amenities: [...property.amenities],
    rates: {
      nightly: property.rates?.nightly,
      monthly: property.rates?.monthly,
      weekly: property.rates?.weekly,
    },
    seller_info: {
      name: property.seller_info.name,
      email: property.seller_info.email,
      phone: property.seller_info.phone,
    },
    images: [...property.images],
    is_featured: property.is_featured,
    createdAt: property.createdAt?.toISOString() || null, // Convert to ISO string
    updatedAt: property.updatedAt?.toISOString() || null, // Convert to ISO string
  };

  return plainObj;
};

export default convertToPlainPropertyObject;
