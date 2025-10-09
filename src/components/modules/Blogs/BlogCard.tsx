// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";
// import { Card } from "@/components/ui/card";
// import { BlogPost } from "@/types";

// export default function BlogCard({ post }: { post: BlogPost }) {
//   return (
//     <div className="grid gap-y-10 sm:grid-cols-12 mx-3 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
//       <Card
//         key={post.id}
//         className="order-last border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2 rounded-2xl p-6 sm:p-8"
//       >
//         <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 md:items-center md:gap-x-8 lg:gap-x-12">
//           {/* Text Section */}
//           <div className="sm:col-span-5 pl-2 md:pl-4 lg:pl-6">
//             <div className="mb-4 md:mb-6">
//               <div className="flex flex-wrap gap-3 text-xs tracking-wider text-gray-500 dark:text-gray-400 uppercase md:gap-5 lg:gap-6">
//                 {post.tags?.map((tag: any) => (
//                   <span
//                     key={tag}
//                     className="px-2 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-purple-400 border border-blue-500/20 dark:border-purple-400/20"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
//               <a
//                 href={`/blogs/${post.id}`}
//                 target="_blank"
//                 className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
//               >
//                 {post.title}
//               </a>
//             </h3>

//             <p className="mt-4 text-gray-600 dark:text-gray-300 md:mt-5">
//               {post.description}
//             </p>

//             <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8 text-gray-500 dark:text-gray-400">
//               {/* <span>{post.author}</span> */}
//               <span>•</span>
//               {/* <span>{post.published}</span> */}
//             </div>

//             <div className="mt-6 flex items-center space-x-2 md:mt-8">
//               <a
//                 href={`/blogs/${post.id}`}
//                 target="_blank"
//                 className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline md:text-base"
//               >
//                 <span>Read more</span>
//                 <ArrowRight className="ml-2 size-4 text-blue-600 dark:text-purple-400 transition-transform group-hover:translate-x-1" />
//               </a>
//             </div>
//           </div>

//           {/* Image Section */}
//           <div className="order-first sm:order-last sm:col-span-5">
//             <a href={`/blogs/${post.id}`} target="_blank" className="block">
//               <div className="aspect-16/9 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
//                 <img
//                   src={
//                     post.thumbnail ||
//                     "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
//                   }
//                   alt={post.title}
//                   className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
//                 />
//               </div>
//             </a>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }
