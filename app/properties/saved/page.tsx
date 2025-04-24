import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionuser";

const SavedPropertiesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const { bookmarks } = await User.findById(sessionUser?.userId).populate("bookmarks");
  return (
    <section className='px-4 py-6'>
      <div className='container lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className='flex flex-col lg:flex-row flex-wrap gap-6'>
            {bookmarks.map((property)=> {
              const plainProperty = property.toObject({ virtuals: true })
              return <PropertyCard property={plainProperty} key={plainProperty._id.toString()} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
