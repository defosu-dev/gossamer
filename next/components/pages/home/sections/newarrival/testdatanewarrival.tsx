import { FeatureItemProps } from "./FeatureItem";

export const testdatanewarrival = {
  label: "НОВИНКА",
  title: "Marshall Major IV",
  description:
    "Легендарные беспроводные наушники с мощным звуком, 80+ часов автономности и быстрой зарядкой.",
  features: [
    {
      icon: "Volume2",
      text: "Мощный звук",
    },
    {
      icon: "BatteryCharging",
      text: "80+ часов работы",
    },
    {
      icon: "ThumbsUp",
      text: "Удобная посадка",
    },
  ] as FeatureItemProps[],
  image: {
    src: "https://images.unsplash.com/photo-1585386959984-a4155223f7f9?q=80&w=800&auto=format&fit=crop",
    alt: "Marshall Major IV",
  },
};
