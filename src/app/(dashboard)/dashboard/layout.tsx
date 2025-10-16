import { getUser } from "@/lib/getUser";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUser();

  console.log(data);

  const user = {
    name: data?.name || "Admin",
    email: data?.email || "Admin Email",
    avatar: data?.picture || "/avatars/shadcn.jpg",
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
