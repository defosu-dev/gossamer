import { IChildren } from "@/types/IChildren";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface IPortal extends IChildren {
  containerId?: string;
}

const Portal = ({ children, containerId = "portal-root" }: IPortal) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);

    if (!element) {
      element = document.createElement("div");
      element.id = containerId;
      document.body.appendChild(element);
    }

    setContainer(element);

    return () => {
      if (element && element.parentNode && element.childNodes.length === 0) {
        element.parentNode.removeChild(element);
      }
    };
  }, [containerId]);

  if (!container) return null;

  return createPortal(children, container);
};

export default Portal;
