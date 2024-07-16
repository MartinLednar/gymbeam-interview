export const TodoSkeleton = () => (
  <div className="bg-gray-600/30 animate-pulse p-7 rounded-md">
    <div className="flex items-center justify-between">
      <div className="w-10 h-10  bg-gray-600/30 rounded-md animate-pulse"></div>
      <div className="w-10 h-10 bg-gray-600/30 rounded-md animate-pulse"></div>
    </div>

    <div className="flex flex-col gap-y-4 pt-10">
      <div className="h-8 w-1/6 bg-gray-600/30 rounded-full animate-pulse"></div>
      <div className="h-8 w-2/3 bg-gray-600/30 rounded-md animate-pulse"></div>
      <div className="flex flex-col gap-y-3 w-full pt-3">
        <div className="h-4 w-2/3 bg-gray-600/30 rounded-md animate-pulse"></div>
        <div className="h-4 w-2/4 bg-gray-600/30 rounded-md animate-pulse"></div>
        <div className="h-4 w-4/5 bg-gray-600/30 rounded-md animate-pulse"></div>
      </div>
    </div>
  </div>
);
