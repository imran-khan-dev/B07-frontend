import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { getUser } from "@/lib/getUser";
import { ScrollAndUnlock } from "@/components/ScrollAndUnlock";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = (await getUser()) || {};

  const user = {
    name: userData?.data?.name || "Admin",
    email: userData?.data?.email || "Admin Email",
    avatar: userData?.data?.picture || "/avatars/shadcn.jpg",
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} variant="inset" />
      <SidebarInset className="flex flex-col min-h-screen overflow-hidden bg-background text-foreground">
        <ScrollAndUnlock />
        <SiteHeader />
        <main className="flex-1 overflow-y-auto overscroll-contain px-4 pt-4 pb-6 md:px-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
