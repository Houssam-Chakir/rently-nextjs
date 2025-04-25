import findUserById from "@/app/actions/findUser";
import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyType from "@/Types/PropertiesType";
import convertToPlainPropertyObject from "@/utils/convertToPlainPropertyObject";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type PropertyDetailTypes = {
  params: Promise<{ id: string }>;
};

const PropertyPage = async ({ params }: PropertyDetailTypes) => {
  await connectDB();

  const { id } = await params;
  const propertyDoc = (await Property.findById(id).lean());
  console.log('propertyDoc: ', propertyDoc);
  const property = convertToPlainPropertyObject(propertyDoc) as PropertyType;
  const user = await findUserById();
  const isBookmarked = user.bookmarks.includes(property._id);

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link href='/properties' className='text-blue-500 hover:text-blue-600 flex items-center'>
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70-30 w-full gap-6'>
            <PropertyDetails property={property} />
            <aside className='space-y-4'>
              <BookmarkButton property={property} isBookmarked={isBookmarked} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
