'use client';

import { useForm } from '@tanstack/react-form';
import { UserRound, Phone, Loader2 } from 'lucide-react';

import InputField from '@/components/ui/InputField';
import SubmitButton from '@/components/ui/SubmitButton';
import { useUser, useUpdateProfile } from '@/hooks/user';
import { updateProfileSchema } from '@/lib/validator/user';

export function ProfileForm() {
  const { user } = useUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
    },

    onSubmit: async ({ value }) => {
      updateProfile(value);
    },
  });

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Personal Information</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="name">
          {(field) => (
            <InputField
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              placeholder="John Doe"
              icon={<UserRound className="size-4.5" />}
            />
          )}
        </form.Field>

        <form.Field name="phone">
          {(field) => (
            <InputField
              name={field.name}
              value={field.state.value}
              onChange={field.handleChange}
              onBlur={field.handleBlur}
              errors={field.state.meta.errors}
              placeholder="+1 234 567 890"
              icon={<Phone className="size-4.5" />}
            />
          )}
        </form.Field>

        <div className="pt-2">
          <SubmitButton title="Save Changes" titleLoading="Saving..." isLoading={isPending} />
        </div>
      </form>
    </div>
  );
}
