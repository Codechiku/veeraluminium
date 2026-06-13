import {
  AppWindow,
  Award,
  Blinds,
  Building2,
  CalendarClock,
  CheckCircle2,
  Cog,
  Cpu,
  DoorOpen,
  Fence,
  Frame,
  Hammer,
  Home,
  LayoutGrid,
  type LucideIcon,
  MapPin,
  MoveHorizontal,
  PanelTop,
  ReceiptText,
  Shield,
  ShieldCheck,
  Store,
  Users,
  Wrench,
} from "lucide-react";

/** Maps the string icon names used in data files to lucide components. */
const iconMap: Record<string, LucideIcon> = {
  AppWindow,
  Blinds,
  DoorOpen,
  MoveHorizontal,
  Frame,
  Shield,
  Building2,
  LayoutGrid,
  Wrench,
  Fence,
  PanelTop,
  Store,
  Home,
  Hammer,
  Award,
  ShieldCheck,
  Users,
  Cog,
  Cpu,
  ReceiptText,
  CheckCircle2,
  CalendarClock,
  MapPin,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = iconMap[name] ?? Frame;
  return <Cmp className={className} aria-hidden />;
}
