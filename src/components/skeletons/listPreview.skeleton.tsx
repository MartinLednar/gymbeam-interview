export const ListPreviewSkeleton = () => (
  <div className="flex-1 h-max rounded-md bg-gray-600/30 animate-pulse">
    <div className="h-32 bg-gray-600/30 animate-pulse pb-4 pl-6 flex items-end">
      <div className="h-10 w-2/3 bg-gray-600/30 animate-pulse rounded-md" />
    </div>

    <div className="p-6 flex flex-col gap-y-4">
      <div className="h-8 w-4/5 bg-gray-600/30 animate-pulse rounded-md" />
      <div className="h-8 w-3/5 bg-gray-600/30 animate-pulse rounded-md" />
      <div className="h-10 w-full bg-gray-600/30 animate-pulse rounded-md" />
    </div>
  </div>
);
