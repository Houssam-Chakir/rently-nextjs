import findPropertyByOwner from "@/app/actions/findProperty";
import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import convertToSerializableObject from "@/utils/convertToObj";
import verifySession from "@/utils/verifySession";

const EditPropertyPage = async({params}) => {
  await connectDB()
  const {id: propertyId} = await params
  const userId = await verifySession()
  const propertyDoc = await findPropertyByOwner(propertyId, userId)
  const property = convertToSerializableObject(propertyDoc)

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border border-gray-300 m-4 md:m-0'>
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
