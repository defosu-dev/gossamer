import { cn } from '@/lib/utils/cn';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  errors?: unknown[];
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  textarea?: boolean;
  autoComplete?: string;
}

function InputField({
  name,
  value,
  onChange,
  onBlur,
  errors = [],
  placeholder,
  type = 'text',
  disabled = false,
  icon,
  textarea = false,
  autoComplete,
}: InputFieldProps) {
  const errorMessage = errors.length > 0 ? getErrorMessage(errors[0]) : '';

  return (
    <div className="w-full">
      <div className="group relative w-full">
        {icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800">{icon}</div>
        )}

        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={cn(
              'min-h-32 w-full resize-none rounded-3xl border p-3 text-sm font-medium text-neutral-900 placeholder-neutral-700',
              icon ? 'pl-9' : '',
              errors.length
                ? 'border-red-500 focus:ring-red-500'
                : 'border-neutral-300 focus:ring-neutral-500',
              'transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none',
              'disabled:opacity-50'
            )}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete={autoComplete}
            className={cn(
              'h-full w-full rounded-full border p-3 text-sm font-medium text-neutral-900 placeholder-neutral-700',
              icon ? 'pl-9' : '',
              errors.length
                ? 'border-red-500 focus:ring-red-500'
                : 'border-neutral-300 focus:ring-neutral-500',
              'transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none',
              'disabled:opacity-50'
            )}
          />
        )}
      </div>

      {errorMessage && <p className="mt-1 ml-2 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default InputField;
