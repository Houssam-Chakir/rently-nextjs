import Link from "next/link";

type PaginationType = {
  page: number;
  pageSize: number;
  totalItems: number;
};

const Pagination = ({ page, pageSize, totalItems }: PaginationType) => {
  const totalPages: number = Math.ceil(totalItems / pageSize);

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {page > 1 && (
        <Link href={`/properties?page=${page - 1}`} className='mr-2 px-2 py-1 border border-gray-300 rounded'>
          previous
        </Link>
      )}

      {totalPages > 1 &&(<span className='mx-2'>
        Page {page} of {totalPages}
      </span>)}

      {page < totalPages && (
        <Link href={`/properties?page=${page + 1}`} className='ml-2 px-2 py-1 border border-gray-300 rounded'>
          next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
