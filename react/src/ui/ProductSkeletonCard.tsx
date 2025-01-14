export default function ProductSkeletonCard() {
  return (
    <li className="w-full sm:w-[48%] lg:w-[32%]">
      <div className="flex h-[20rem] animate-pulse items-center rounded-md bg-gray-100">
        <div className="mx-auto h-64 w-64 rounded-md bg-gray-300" />
      </div>
      <div className="my-2 flex animate-pulse flex-col space-y-1">
        <div className="h-4 w-3/4 rounded-md bg-gray-300" />
        <div className="h-4 w-1/2 rounded-md bg-gray-300" />
        <div className="h-6 w-1/3 rounded-md bg-gray-300" />
      </div>
    </li>
  );
}
