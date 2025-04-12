import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Home page</div>
      <Link href={'properties'}>Properties</Link>
    </>
  );
}
