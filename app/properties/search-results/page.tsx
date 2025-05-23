import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyType from "@/Types/PropertiesType";
import convertToSerializableObject from "@/utils/convertToObj";
import convertToPlainPropertyObject from "@/utils/convertToPlainPropertyObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams }) => {
  const { location, propertyType } = await searchParams;

  await connectDB();
  const locationPattern = new RegExp(location, "i");
  const query: {
    $or: { [key: string]: RegExp }[];
    type?: RegExp;
  } = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType !== "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  console.log('query: ', query);
  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueryResults);
  console.log("properties: ", properties);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link href='/properties' className='flex items-center text-blue-500 hover:underline mb-3'>
            <FaArrowAltCircleLeft className='mr-2' /> Back to properties
          </Link>
          <h1 className='text-2xl mb-4'>Search results:</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((propertyDoc) => {
                const property = convertToPlainPropertyObject(propertyDoc) as PropertyType
                return <PropertyCard key={property._id.toString()} property={property} />;
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
