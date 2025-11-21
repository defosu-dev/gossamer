'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Props for the Portal component.
 */
export interface PortalProps {

  /** Content to render inside the portal */
  children: ReactNode;

  /** ID of the container element for the portal */
  containerId?: string;
}

/**
 * Portal.
 *
 * Renders children into a DOM node outside the parent hierarchy.
 * - Creates the container element if it doesn't exist.
 * - Cleans up the container if it's empty when unmounted.
 *
 * @remarks
 * Client component required.
 */
export function Portal({ children, containerId = 'portal-root' }: PortalProps) {
  const [container] = useState<HTMLElement>(() => {
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement('div');
      element.id = containerId;
      document.body.appendChild(element);
    }
    return element;
  });

  useEffect(() => {
    return () => {
      if (container.parentNode && container.childNodes.length === 0) {
        container.parentNode.removeChild(container);
      }
    };
  }, [container]);

  return createPortal(children, container);
}

export default Portal;
