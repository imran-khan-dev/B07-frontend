import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/getUser";

export async function SiteHeader() {
  const userRes = await getUser();
  const user = userRes?.data;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Please login first.
      </div>
    );
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium"> Welcome Admin, {user.name}</h1>
      </div>
    </header>
  );
}
