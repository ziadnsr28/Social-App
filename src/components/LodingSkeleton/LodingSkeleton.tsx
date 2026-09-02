import { Skeleton } from "@heroui/react";

export default function PostSkeleton() {
  return (
    <>
      {[0, 1].map((skeleton) => (
        <div
          key={skeleton}
          className="max-w-lg w-full bg-white rounded-2xl shadow-md mt-5 mx-auto overflow-hidden p-4 space-y-4"
        >
          {/* رأس المنشور */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>

            <Skeleton className="h-5 w-5 rounded-full" />
          </div>

          <Skeleton className="h-6 w-40" />

          {/* الطولية */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />

            <div className="space-y-1 pr-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Skeleton className="h-4 w-full" />

          {/* العرضية */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />

            <div className="space-y-1 pr-2">
              <Skeleton className="h-4 w-52" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* الأزرار */}
          <div className="flex items-center justify-around pt-2 border-t border-gray-100">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>

          {/* الإحصائيات */}
          <div className="flex items-center gap-4 pt-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </>
  );
}