import { IconType } from "react-icons";

interface FeatureBadgeProps {
  Icon: IconType;
  header: string;
  shortText: string;
}
export default function FeatureBadge({
  Icon,
  header,
  shortText,
}: FeatureBadgeProps) {
  return (
    <li className="flex flex-row items-center gap-5 sm:flex-col">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <Icon className="text-red-500" size={44} />
      </div>
      <div className="text-gray-800 sm:text-center">
        <h3 className="font-semibold">{header}</h3>
        <span className="text-sm text-gray-600">{shortText}</span>
      </div>
    </li>
  );
}
