interface CheckboxFieldProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label: string;
}

export function CheckboxField({
  name,
  checked,
  onChange,
  disabled = false,
  label,
}: CheckboxFieldProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="cursor-pointer"
      />
      <label htmlFor={name} className="ml-2 cursor-pointer text-sm font-medium text-neutral-600">
        {label}
      </label>
    </div>
  );
}
