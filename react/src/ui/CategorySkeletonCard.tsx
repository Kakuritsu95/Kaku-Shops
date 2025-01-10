export default function CategoryPreviewCardSkeleton() {
  return (
    <div className="flex h-[27rem] animate-pulse flex-col items-center rounded-3xl bg-gray-100 px-5 pt-7 text-center sm:w-[48%] lg:w-[32%]">
      <div className="h-[175px] w-80">
        <div className="mx-auto h-40 w-40 rounded bg-gray-300"></div>
      </div>
      <div className="w-full space-y-5">
        <div className="mx-auto h-6 w-3/4 rounded bg-gray-300"></div>
        <div className="mx-auto h-4 w-full rounded bg-gray-300"></div>
        <div className="mx-auto h-4 w-full rounded bg-gray-300"></div>
        <div className="mx-auto h-10 w-1/2 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
