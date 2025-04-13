import {PropertyType} from '@/.next/types/Properties'
import PropertyCard from '@/components/PropertyCard';

import properties from "@/properties.json";
import { ReactElement } from "react";

const PropertiesPage = () => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property: PropertyType):ReactElement => {
              return (<PropertyCard property={property} key={property._id}/>)
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
