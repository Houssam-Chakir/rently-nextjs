import Image from "next/image";
import { JSX } from "react";

type PropertyHeaderImageType = {
  image: string;
};

const PropertyHeaderImage = ({ image }: PropertyHeaderImageType): JSX.Element => {
  console.log("image: ", image);
  return (
    <>
      <section>
        <div className='container-xl m-auto'>
          <div className='grid grid-cols-1'>
            <Image src={image} width='0' height='0' sizes="100vw" alt='' className='object-cover h-[400px] w-full' />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHeaderImage;
