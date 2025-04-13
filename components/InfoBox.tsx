import Link from "next/link";

type InfoBoxType = {
  bgColor: string,
  buttonColor: string,
  title: string,
  description: string,
  btnLabel: string,
  btnLink: string
};

const Infobox = ({ bgColor, buttonColor, title, description, btnLabel, btnLink }: InfoBoxType) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className='text-2xl font-bold'>{title}</h2>
      <p className='mt-2 mb-4'>{description}</p>
      <Link href={btnLink} className={`${buttonColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700`}>
        {btnLabel}
      </Link>
    </div>
  );
};

export default Infobox;
