import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { getErrorMessage } from '@/lib/utils/getErrorMessage';

interface PasswordFieldProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  placeholder?: string;
  errors?: unknown[];
  icon?: React.ReactNode;
  autoComplete?: string;
}

export function PasswordField({
  name,
  value,
  onChange,
  onBlur,
  disabled = false,
  placeholder = '',
  errors = [],
  icon,
  autoComplete = '',
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  const errorMsg = errors.length > 0 ? getErrorMessage(errors[0]) : '';

  return (
    <div className="w-full">
      <div className="group relative w-full">
        {icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800">{icon}</div>
        )}
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            'h-full w-full rounded-full border py-3 pr-12 pl-9 text-sm font-medium text-neutral-900 placeholder-neutral-700',
            errorMsg
              ? 'border-red-500 focus:ring-red-500'
              : 'border-neutral-300 focus:ring-neutral-500',
            'transition-all duration-200 focus:border-transparent focus:ring-2 focus:outline-none disabled:opacity-50'
          )}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-800"
          disabled={disabled}
        >
          {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
        </button>
      </div>
      {errorMsg && <p className="mt-1 ml-2 text-xs text-red-500">{errorMsg}</p>}
    </div>
  );
}
