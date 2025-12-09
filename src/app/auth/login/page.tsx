import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import SignInFormSkeleton from './_components/SignInFormSkeleton';

const SignInForm = dynamic(() => import('./_components/SignInForm').then((mod) => mod.SignInForm), {
  loading: () => <SignInFormSkeleton />,
});

export const metadata: Metadata = {
  title: 'Sign In | Gossamer',
  description: 'Log in to your Gossamer account',
};

export default function SignInPage() {
  return <SignInForm />;
}
