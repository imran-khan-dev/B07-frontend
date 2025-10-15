import { getCurrentUser } from "@/lib/getCurrentUser";
import { getDashboardStats } from "@/lib/getDashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardHomeStats() {
  const userRes = await getCurrentUser();
  const user = userRes?.data;

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Please login first.
      </div>
    );
  }

  const stats = await getDashboardStats();

  const blogStats = stats?.blogStats?.data;
  const projectStats = stats?.projectStats?.data;

  return (
    <div className="w-full min-h-screen p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome Admin, {user.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Email: {user.email}</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Blogs */}
        <Card className="shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Total Blogs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {blogStats?.totalBlogs ?? 0}
            </p>
          </CardContent>
        </Card>

        {/* Total Views */}
        <Card className="shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">
              {blogStats?.totalViews ?? 0}
            </p>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {projectStats?.totalProject ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Extra Blog Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
        <Card className="bg-white dark:bg-gray-900 shadow-sm">
          <CardHeader>
            <CardTitle>Average Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
              {blogStats?.avgViews?.toFixed(2) ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 shadow-sm">
          <CardHeader>
            <CardTitle>Min Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {blogStats?.minViews ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 shadow-sm">
          <CardHeader>
            <CardTitle>Max Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              {blogStats?.maxViews ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
