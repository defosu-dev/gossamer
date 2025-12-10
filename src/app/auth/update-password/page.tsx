import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { UpdatePasswordFormSkeleton } from './_components/UpdatePasswordFormSkeleton';

const UpdatePasswordForm = dynamic(
  () => import('./_components/UpdatePasswordForm').then((mod) => mod.UpdatePasswordForm),
  {
    loading: () => <UpdatePasswordFormSkeleton />,
  }
);

export const metadata: Metadata = {
  title: 'Update Password | Gossamer',
  description: 'Set a new password for your account',
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
