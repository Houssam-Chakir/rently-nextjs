import { ReactElement } from "react";
import PropertyType from "@/Types/PropertiesType";

import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import convertToPlainPropertyObject from "@/utils/convertToPlainPropertyObject";
import Pagination from "@/components/Pagination";

const PropertiesPage = async ({ searchParams }) => {
  await connectDB();

  const { page = '1', pageSize = 3 } = await searchParams as {page: string, pageSize: number};
  const skip = (parseInt(page) - 1) * pageSize;
  const total: number = await Property.countDocuments({});

  const properties = await Property.find({}).skip(skip).limit(pageSize).lean();

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
        <Pagination page={parseInt(page)} pageSize={(pageSize)} totalItems={total} />
      </div>
    </section>
  );
};

export default PropertiesPage;
