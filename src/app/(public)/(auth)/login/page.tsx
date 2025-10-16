import AdminLoginForm from "@/components/modules/Auth/AdminLogin";
import { Metadata } from "next";


export const metadata:Metadata = {
  title: "Admin Login | Imran Khan",
  description:
    "Admin Login page of Imran Khan's portfolio",
};

export default function AdminLoginPage() {
  return (
    <div>
      <AdminLoginForm />
    </div>
  );
}
