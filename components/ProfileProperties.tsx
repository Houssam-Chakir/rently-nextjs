"use client";

import deleteProperty from "@/app/actions/deleteProperty";
import PropertyType from "@/Types/PropertiesType";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const ProfileProperties = ({ properties: initialProperties }: { properties: PropertyType[] }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this property?");
    if (!isConfirmed) return;

    try {
      await deleteProperty(propertyId);
      const updatedProperties = properties.filter((property) => property._id !== propertyId);
      setProperties(updatedProperties);

      toast.success('Property deleted successfuly')
    } catch (error) {
      console.error("Failed to delete property:", error);
      // Maybe show an error message to the user
    }
  };

  return properties.map((property, index) => {
    const { _id, name, location } = property;
    return (
      <div key={index} className='mb-10'>
        <Link href={`/properties/${_id}`}>
          <Image width={0} height={0} sizes='100vw' className='h-32 w-full rounded-md object-cover' src={property.images[0]} alt={property.name} />
        </Link>
        <div className='mt-2'>
          <p className='text-lg font-semibold'>{name}</p>
          <p className='text-gray-600'>
            Address: {location.street} {location.city} {location.state} {location.zipcode}
          </p>
        </div>
        <div className='mt-2'>
          <Link href={`/properties/${_id}/edit`} className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'>
            Edit
          </Link>
          <button onClick={() => handleDeleteProperty(_id)} className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600' type='button'>
            Delete
          </button>
        </div>
      </div>
    );
  });
};

export default ProfileProperties;
