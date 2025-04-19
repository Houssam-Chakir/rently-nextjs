import Image from "next/image";

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto'>
        {images.length === 1 ? (
          <Image src={images[0]} alt='' className='object-cover h-[400px] mx-auto rounded-xl' width={1800} height={1800} priority={true} />
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            {images.map((image, index) => {
              return (
                <div key={index} className='cold-span-1'>
                  <Image src={image} alt='' className='object-cover h-[400px] w-full rounded-xl' width={1800} height={1800} priority={true} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
