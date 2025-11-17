import { IChildren } from '@/types/IChildren';

export type IContainer = {
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  xCenter?: boolean;
  className?: string;
} & IChildren;
