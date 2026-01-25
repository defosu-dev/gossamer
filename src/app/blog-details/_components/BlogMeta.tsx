export default function BlogMeta() {
  return (
    <div className="flex flex-col gap-6 text-sm text-neutral-600">
      <div>
        <span className="block text-xs text-neutral-400 uppercase">Date</span>
        <span className="font-medium text-neutral-900">11 Jan 2024</span>
      </div>

      <div className="flex flex-col gap-3">
        <MetaItem label="Facebook" value="Stuffsus" />
        <MetaItem label="Instagram" value="@Stuff_sus" />
        <MetaItem label="LinkedIn" value="Stuffsus" />
        <MetaItem label="Youtube" value="Stuffsus" />
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs text-neutral-400 uppercase">{label}</span>
      <span className="font-medium text-neutral-900">{value}</span>
    </div>
  );
}
