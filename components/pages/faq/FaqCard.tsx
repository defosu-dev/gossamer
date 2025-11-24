import { type ReactNode } from 'react';

interface FaqCardProps {
  /** Icon displayed in the top-left circle */
  icon: ReactNode;

  /** Card title */
  title: string;

  /** Card description text */
  text: string;
}

/**
 * FAQ card component used to display a single question/answer item with an icon.
 *
 * @remarks
 * Pure presentational component typically used inside grids or lists.
 * Accepts any React node as an icon.
 */
export function FaqCard({ icon, title, text }: FaqCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
        {icon}
      </div>
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default FaqCard;
