import { Volume2, BatteryCharging, ThumbsUp } from "lucide-react";
import FeatureItem from "./FeatureItem";

const FeatureList = () => {
  return (
    <div className="flex flex-col gap-6">
      <FeatureItem
        icon={<Volume2 size={28} />}
        title="Super Sound"
        text="the sound It will reach your neighbourhood house"
      />
      <FeatureItem
        icon={<BatteryCharging size={28} />}
        title="Samson Battery"
        text="3124124 mAh, can sound you 214 hours"
      />
      <FeatureItem
        icon={<ThumbsUp size={28} />}
        title="Clean Design"
        text="With clean design it will be seamless"
      />
    </div>
  );
};

export default FeatureList;
