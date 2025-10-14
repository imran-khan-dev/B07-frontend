import { getCurrentUser } from "@/lib/getCurrentUser";

const DashboardHomePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Please login first.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>

      <div className="mt-4">{/* <LogoutButton /> */}</div>
    </div>
  );
};

export default DashboardHomePage;
