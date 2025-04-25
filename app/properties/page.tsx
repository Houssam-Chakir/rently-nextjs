import { ReactElement } from "react";
import PropertyType from "@/Types/PropertiesType";

import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import convertToPlainPropertyObject from "@/utils/convertToPlainPropertyObject";

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((propertyDoc): ReactElement => {
              const property = convertToPlainPropertyObject(propertyDoc) as PropertyType;
              return <PropertyCard property={property} key={property._id.toString()} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
