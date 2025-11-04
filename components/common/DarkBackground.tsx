import { cn } from "@/utils/cn";

type IDarkBackground = {
  open: boolean;
  setOpen: () => void;
};

const DarkBackground = ({ open, setOpen }: IDarkBackground) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/30 shadow-2xl",
        "transition-opacity duration-1000",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      onClick={setOpen}
      aria-hidden
    />
  );
};

export default DarkBackground;
