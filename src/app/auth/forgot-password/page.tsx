import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { ForgotPasswordFormSkeleton } from './_components/ForgotPasswordFormSkeleton';

const ForgotPasswordForm = dynamic(
  () => import('./_components/ForgotPasswordForm').then((mod) => mod.ForgotPasswordForm),
  {
    loading: () => <ForgotPasswordFormSkeleton />,
  }
);

export const metadata: Metadata = {
  title: 'Forgot Password | Gossamer',
  description: 'Reset your password',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
