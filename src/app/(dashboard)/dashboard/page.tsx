import { SectionCards } from "@/components/section-cards";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Dashboard | Imran Khan",
  description:
    "Dashbaord of Imran Khan's portfolio",
};

export default function DashboardHome() {

  

  return (
    <div>
      <SectionCards />
    </div>
  );
}
