import { FeatureItemProps } from "./FeatureItem"; // любые иконки

export const testdatanewarrival = {
  label: "NEW ON ASSORTIMENT",
  title: "Marshall Major IV",
  description:
    "Legendary wireless headphones with powerful sound, 80+ hours of playtime and fast charging.",
  features: [
    {
      icon: "Volume2",
      text: "Strong Sound",
    },
    {
      icon: "BatteryCharging",
      text: "80+ Work Time",
    },
    {
      icon: "ThumbsUp",
      text: "Comfortable Fit",
    },
  ] as FeatureItemProps[],
  image: {
    src: "https://images.unsplash.com/photo-1585386959984-a4155223f7f9?q=80&w=800&auto=format&fit=crop",
    alt: "Marshall Major IV",
  },
};
