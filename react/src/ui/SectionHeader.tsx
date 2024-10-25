export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-12 flex items-center gap-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <hr className="block flex-1 border-black" />
    </div>
  );
}
