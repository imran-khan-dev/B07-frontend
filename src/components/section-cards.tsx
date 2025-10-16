import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDashboardStats } from "@/lib/getDashboardStats";

export async function SectionCards() {
  const stats = await getDashboardStats();

  const blogStats = stats?.blogStats?.data;
  const projectStats = stats?.projectStats?.data;

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {projectStats?.totalProject ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Blog</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {blogStats?.totalBlogs ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Blog Views</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {blogStats?.totalViews ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Average Blog Views</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {blogStats?.avgViews?.toFixed(2) ?? 0}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
