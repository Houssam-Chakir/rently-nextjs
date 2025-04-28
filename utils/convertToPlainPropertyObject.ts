import PropertyType from "@/Types/PropertiesType";

const convertToPlainPropertyObject = (property) => {
  console.log('property in convert method: ', property);
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
    createdAt: '',
    updatedAt: '',
  };

  if (property.createdAt instanceof Date) {
    plainObj.createdAt = property.createdAt.toISOString();
  } else if (typeof property.createdAt === 'string') {
    // Optional: Validate if it's already an ISO string if needed,
    // otherwise, assume the string form is acceptable.
    plainObj.createdAt = property.createdAt;
  }
  // Add handling for other types like numbers (timestamps) if necessary

  // Check and convert updatedAt
  if (property.updatedAt instanceof Date) {
    plainObj.updatedAt = property.updatedAt.toISOString();
  } else if (typeof property.updatedAt === 'string') {
    plainObj.updatedAt = property.updatedAt;
  }

  return plainObj;
};

export default convertToPlainPropertyObject;
