import Link from "next/link";

const UndefinedPage: React.FC = () => (
  <div className="text-2xl font-bold h-screen flex flex-col text-cetner justify-center items-center gap-8">
    <h1>404</h1>
    <Link href="/garden" passHref>
    <div className="bg-water-100 text-monstera-700 text-base font-medium rounded-full px-3 py-2 shadow-xl hover:shadow-sm">
      Return to garden
    </div>
    </Link>
  </div>
);

export default UndefinedPage;
