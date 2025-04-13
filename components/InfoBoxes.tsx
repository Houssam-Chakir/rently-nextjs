import Infobox from "./InfoBox";

const InfoBoxesContent = [
  {
    title: "For Renters",
    description: "Find your dream rental property. Bookmark properties and contact owners.",
    btn: {
      label: "Browse Properties",
      link: "/properties",
    },
  },
  {
    title: "For Property Owners",
    description: "List your properties and reach potential tenants. Rent as an airbnb or long term.",
    btn: {
      label: "Add Property",
      link: "/properties/add",
    },
  },
];

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <Infobox
            bgColor='bg-gray-100'
            buttonColor='bg-black'
            title={InfoBoxesContent[0].title}
            description={InfoBoxesContent[0].description}
            btnLabel={InfoBoxesContent[0].btn.label}
            btnLink={InfoBoxesContent[0].btn.link}
          />
          <Infobox
            bgColor='bg-blue-100'
            buttonColor='bg-blue-500'
            title={InfoBoxesContent[1].title}
            description={InfoBoxesContent[1].description}
            btnLabel={InfoBoxesContent[1].btn.label}
            btnLink={InfoBoxesContent[1].btn.link}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
