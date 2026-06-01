import { BrandLoader } from "@/components/motion/brand-loader";

export default function Loading() {
  return (
    <div className="pt-32">
      <BrandLoader label="Preparing your experience" />
    </div>
  );
}
