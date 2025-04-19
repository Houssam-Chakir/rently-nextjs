import Image from "next/image";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionuser";
import Property from "@/models/Property";

import profile from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";

import convertToSerializableObject from "@/utils/convertToObj";


type SessionUser = {
  user: {
    email: string;
    id: string;
    name: string;
    image: string;
  };
  userId: string;
} | null;

const ProfilePage = async () => {
  await connectDB();
  const sessionUser: SessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) throw new Error("Unable to retrieve user session");

  const { userId } = sessionUser;
  const {name, email, image} = sessionUser.user

  const properties = await Property.find({owner: userId}).lean()
  const propertiesObj = properties.map(convertToSerializableObject)
  console.log('properties: ', properties[0]);

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Profile</h1>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/4 mx-20 mt-10'>
              <div className='mb-4'>
                <Image width={1000} height={200} className='h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0' src={image || profile} alt='User' />
              </div>

              <h2 className='text-2xl mb-4'>
                <span className='font-bold block'>Name: </span> {name}
              </h2>
              <h2 className='text-2xl'>
                <span className='font-bold block'>Email: </span> {email}
              </h2>
            </div>

            <div className='md:w-3/4 md:pl-4'>
              <h2 className='text-xl font-semibold mb-4'>Your Listings</h2>
              <ProfileProperties properties={propertiesObj} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
