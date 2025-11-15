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
    src: "/placeholder.jpg",
    alt: "Marshall Major IV",
  },
};
