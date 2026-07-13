import {
  Beef,
  ChefHat,
  Citrus,
  Coffee,
  Croissant,
  CupSoda,
  Leaf,
  Sandwich,
  Snowflake,
  Soup,
  UtensilsCrossed,
  Wheat,
  Wind,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  croissant: Croissant,
  sandwich: Sandwich,
  "chef-hat": ChefHat,
  beef: Beef,
  wheat: Wheat,
  soup: Soup,
  leaf: Leaf,
  coffee: Coffee,
  citrus: Citrus,
  snowflake: Snowflake,
  wind: Wind,
  cup: CupSoda,
  utensils: UtensilsCrossed,
};

export function CategoryIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  const Icon = iconMap[icon] ?? UtensilsCrossed;
  return <Icon className={className} />;
}
