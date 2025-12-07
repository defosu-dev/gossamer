import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SignUpFormSkeleton } from './_components/SignUpFormSkeleton';

const SignUpForm = dynamic(() => import('./_components/SignUpForm').then((mod) => mod.SignUpForm), {
  loading: () => <SignUpFormSkeleton />,
});

export const metadata: Metadata = {
  title: 'Sign Up | Gossamer',
  description: 'Create your Gossamer account',
};

export default function SignUpPage() {
  return <SignUpForm />;
}
