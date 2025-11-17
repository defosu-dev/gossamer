import React from 'react';
import { Badge } from '@/components/common/Badge';
import { IChildren } from '@/types/IChildren';

type ProductCategoryBadgeProps = IChildren;

const ProductCategoryBadge = ({ children }: ProductCategoryBadgeProps) => {
  return (
    <Badge as={'link'} href={'#'} className="absolute top-2 right-2">
      {children}
    </Badge>
  );
};

export default ProductCategoryBadge;
