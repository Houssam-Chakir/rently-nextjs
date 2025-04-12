type PropertyTypes = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name: string }>;
};

const PropertyPage = async ({ params, searchParams }: PropertyTypes) => {
  const { id } = await params;
  const { name } = await searchParams;
  return (
    <div>
      <h1>
        Property {id} {name}
      </h1>
    </div>
  );
};

export default PropertyPage;
