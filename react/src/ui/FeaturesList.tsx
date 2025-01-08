import { BiRocket } from "react-icons/bi";
import { TbCreditCardRefund } from "react-icons/tb";
import { BiBadgeCheck } from "react-icons/bi";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import FeatureBadge from "./FeatureBadge";

export default function FeaturesList() {
  return (
    <ul className="flex flex-col justify-around space-y-5 sm:flex-row sm:space-y-0">
      <FeatureBadge
        Icon={BiRocket}
        header="324+ brands"
        shortText="3.000+ products to choose!"
      />

      <FeatureBadge
        Icon={TbCreditCardRefund}
        header="Shop safe"
        shortText="30-days refund guarantee"
      />

      <FeatureBadge
        Icon={BiBadgeCheck}
        header="Technical support"
        shortText="30-days refund guarantee"
      />

      <FeatureBadge
        Icon={MdOutlineScreenSearchDesktop}
        header="Tracking is easier than ever"
        shortText="   Track your status and access your order history"
      />
    </ul>
  );
}
