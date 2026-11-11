export default function ProductSkeleton() {
  return (
    <div className="flex-1 p-1 md:max-h-[784px] md:overflow-y-auto">
      <div className="grid content-start gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex h-[380px] animate-pulse flex-col rounded-2xl bg-white p-3 shadow-sm"
          >
            <div className="h-44 shrink-0 rounded-xl bg-indigo-100" />
            <div className="mt-3 h-4 w-1/3 rounded bg-indigo-100" />
            <div className="mt-2 h-5 w-3/4 rounded bg-indigo-100" />
            <div className="mt-2 h-4 w-1/2 rounded bg-indigo-100" />
            <div className="mt-3 h-8 w-3/5 rounded-lg bg-indigo-100" />
            <div className="mt-auto h-10 rounded-lg bg-indigo-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
