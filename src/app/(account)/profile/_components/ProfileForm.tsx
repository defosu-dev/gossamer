'use client';

import { useState } from 'react';
import { UserRound, Phone, Mail, Pencil, Check, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useUser, useUpdateProfile } from '@/hooks/user';
import { cn } from '@/lib/utils/cn';
import InputField from '@/components/ui/InputField';

interface EditableRowProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  isEditable?: boolean;
  onSave?: (newValue: string) => Promise<void>;
  isLoading?: boolean;
}

function EditableRow({
  label,
  value,
  icon,
  isEditable = true,
  onSave,
  isLoading,
}: EditableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = async () => {
    if (tempValue === value) {
      setIsEditing(false);
      return;
    }
    if (onSave) {
      await onSave(tempValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-1 border-b border-neutral-50 py-3 last:border-0">
      <span className="ml-9 text-xs font-medium text-neutral-400">{label}</span>

      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neutral-50 text-neutral-500">
          {icon}
        </div>

        {/* Value or Input */}
        <div className="flex-1">
          {isEditing ? (
            <div className="relative">
              <input
                autoFocus
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                disabled={isLoading}
                className={cn(
                  'w-full rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-900',
                  'focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none',
                  'disabled:opacity-50'
                )}
              />
            </div>
          ) : (
            <p className="text-sm font-medium break-all text-neutral-900">
              {value || <span className="text-neutral-300 italic">Not set</span>}
            </p>
          )}
        </div>

        {/* Actions */}
        {isEditable && (
          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="rounded-full p-2 text-green-600 transition-colors hover:bg-green-50 disabled:opacity-50"
                  title="Save"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Check className="size-4" />
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="rounded-full p-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                  title="Cancel"
                >
                  <X className="size-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                title="Edit"
              >
                <Pencil className="size-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProfileForm() {
  const { user } = useUser();
  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  if (!user) return null;

  // Функція збереження для окремого поля
  // Ми відправляємо старі дані + нове поле, щоб задовольнити валідацію,
  // або можна налаштувати бекенд на прийом Partial
  const handleUpdate = async (field: 'name' | 'phone', value: string) => {
    try {
      await updateProfile({
        name: user.name || '',
        phone: user.phone || '',
        [field]: value, // Перезаписуємо тільки те поле, яке змінилось
      });
    } catch (error) {
      console.error(error);
      // Toast вже показується в хуку
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-xl shadow-neutral-100/50">
      <div className="mb-6 flex items-center gap-2 border-b border-neutral-100 pb-4">
        <UserRound className="size-5 text-neutral-400" />
        <h2 className="text-lg font-bold text-neutral-900">Personal Information</h2>
      </div>

      <div className="flex flex-col gap-2">
        {/* Email (Read Only) */}
        <EditableRow
          label="Email Address"
          value={user.email}
          icon={<Mail className="size-4" />}
          isEditable={false}
        />

        {/* Name */}
        <EditableRow
          label="Full Name"
          value={user.name || ''}
          icon={<UserRound className="size-4" />}
          onSave={(val) => handleUpdate('name', val)}
          isLoading={isPending}
        />

        {/* Phone */}
        <EditableRow
          label="Phone Number"
          value={user.phone || ''}
          icon={<Phone className="size-4" />}
          onSave={(val) => handleUpdate('phone', val)}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
