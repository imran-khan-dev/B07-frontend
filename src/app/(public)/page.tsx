import { FeaturePost } from "@/components/modules/Home/FeaturePost";
import { FeatureProjects } from "@/components/modules/Home/FeatureProjects";
import Hero from "@/components/modules/Home/Hero";
import { BlogPost } from "@/types";

export const metadata = {
  title: "Home | Imran Khan",
  description:
    "Hello! I'm Imran Khan, a Full-Stack Web Developer. This is my portfolio website",
};

export default async function HomePage() {
  const resBlog = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await resBlog.json();
  const blogs: BlogPost[] = data.data;

  const resProject = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/all-projects`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  const {data: projects} = await resProject.json();

  console.log(projects);

  // const projects: Project[] = [
  //   {
  //     id: 1,
  //     title: "Turf Management SaaS",
  //     description:
  //       "A full-featured turf booking and management system built with the MERN stack. It includes OTP-based authentication, owner dashboards, online payment integration, and detailed booking analytics.",
  //     thumbnail:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
  //     liveUrl: "https://turfsaas.vercel.app",
  //     repoUrl: "https://github.com/username/turf-management-saas",
  //     features: [
  //       "OTP Login System",
  //       "Turf Owner Dashboard",
  //       "Online Payment (SSLCommerz)",
  //       "Booking Analytics",
  //       "CSV Export",
  //     ],
  //     views: 120,
  //     createdAt: "2025-08-20T10:30:00.000Z",
  //     updatedAt: "2025-09-01T14:15:00.000Z",
  //     owner: {
  //       id: 1,
  //       name: "Rafi Ahmed",
  //       email: "rafi@example.com",
  //       picture: null,
  //       role: "ADMIN",
  //       createdAt: "2025-06-01T09:00:00.000Z",
  //       updatedAt: "2025-09-01T14:00:00.000Z",
  //     },
  //   },
  //   {
  //     id: 2,
  //     title: "Institute Website (MERN)",
  //     description:
  //       "A responsive, admin-driven school website built with the MERN stack. It includes modules for notices, gallery, governing body, and important links — all managed via an admin control panel.",
  //     thumbnail:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
  //     liveUrl: "https://school-mern.vercel.app",
  //     repoUrl: "https://github.com/username/institute-website-mern",
  //     features: [
  //       "Admin Notice Panel",
  //       "Dynamic Photo Gallery",
  //       "Pagination Support",
  //       "Role-based Access",
  //       "Fully Responsive",
  //     ],
  //     views: 86,
  //     createdAt: "2025-07-15T09:20:00.000Z",
  //     updatedAt: "2025-08-02T11:10:00.000Z",
  //     owner: {
  //       id: 1,
  //       name: "Rafi Ahmed",
  //       email: "rafi@example.com",
  //       picture: null,
  //       role: "ADMIN",
  //       createdAt: "2025-06-01T09:00:00.000Z",
  //       updatedAt: "2025-09-01T14:00:00.000Z",
  //     },
  //   },
  //   {
  //     id: 3,
  //     title: "Library Management System",
  //     description:
  //       "A library system built with Express and TypeScript that handles book CRUD, borrowing logic, summary aggregation, and business rules for overdue tracking and reporting.",
  //     thumbnail:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-4.svg",
  //     liveUrl: "https://libraryms.vercel.app",
  //     repoUrl: "https://github.com/username/library-management-api",
  //     features: [
  //       "Book CRUD Operations",
  //       "Borrow & Return Logic",
  //       "Summary Aggregation",
  //       "Mongoose Middleware",
  //       "JWT Authentication",
  //     ],
  //     views: 64,
  //     createdAt: "2025-06-10T12:00:00.000Z",
  //     updatedAt: "2025-07-01T18:30:00.000Z",
  //     owner: {
  //       id: 1,
  //       name: "Rafi Ahmed",
  //       email: "rafi@example.com",
  //       picture: null,
  //       role: "ADMIN",
  //       createdAt: "2025-06-01T09:00:00.000Z",
  //       updatedAt: "2025-09-01T14:00:00.000Z",
  //     },
  //   },
  //   {
  //     id: 4,
  //     title: "Digital Wallet API",
  //     description:
  //       "A secure digital wallet backend with role-based authentication for admin, agent, and users. Includes features like cash-in/out, money transfer, transaction history, and balance tracking.",
  //     thumbnail:
  //       "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-5.svg",
  //     liveUrl: "https://walletapi.vercel.app",
  //     repoUrl: "https://github.com/username/digital-wallet-api",
  //     features: [
  //       "JWT Role-based Auth",
  //       "Transaction Management",
  //       "Balance Tracking",
  //       "Admin Dashboard APIs",
  //       "Cash In/Out Logic",
  //     ],
  //     views: 99,
  //     createdAt: "2025-07-25T09:30:00.000Z",
  //     updatedAt: "2025-08-10T10:45:00.000Z",
  //     owner: {
  //       id: 1,
  //       name: "Rafi Ahmed",
  //       email: "rafi@example.com",
  //       picture: null,
  //       role: "ADMIN",
  //       createdAt: "2025-06-01T09:00:00.000Z",
  //       updatedAt: "2025-09-01T14:00:00.000Z",
  //     },
  //   },
  // ];

  return (
    <>
      <Hero />
      <FeaturePost blogs={blogs} />
      <FeatureProjects projects={projects} />
    </>
  );
}
