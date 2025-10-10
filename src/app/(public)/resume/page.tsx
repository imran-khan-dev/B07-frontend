// src/app/resume/page.tsx
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume | Imran Khan",
  description: "Resume of Imran Khan",
};

export default function ResumePage() {
  return (
    <main className="relative py-20 px-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Imran Khan
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Full Stack Developer | Next.js | React.js | TypeScript | Node.js
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="mailto:yourmail@gmail.com"
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <Mail size={16} /> emranniloy84@gmail.com
              </Link>
              {/* <span className="flex items-center gap-2">
                <Phone size={16} /> +8801XXXXXXXXX
              </span> */}
              <span className="flex items-center gap-2">
                <MapPin size={16} /> Dhaka, Bangladesh
              </span>
            </div>
          </div>

          {/* <button className="mt-6 sm:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all">
            <Download size={18} /> Download PDF
          </button> */}
        </header>

        <hr className="border-gray-200 dark:border-gray-800 my-8" />

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Summary
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I am a passionate Full Stack Developer who loves building scalable,
            user-friendly web applications with modern technologies like Next
            JS, React, TypeScript, and Node.js etc. I focus on writing clean,
            maintainable code following best practices and design principles.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Redux Toolkit",
              "Tailwind CSS",
              "Prisma",
              "GitHub",
              "PostgreSQL",
              "Firebase",
              "Figma",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-purple-400 border border-blue-500/20 dark:border-purple-400/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        {/* <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Experience
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                MERN Stack Developer — Freelance
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Jan 2024 – Present | Dhaka, Bangladesh
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Developed multiple full-stack MERN applications.</li>
                <li>
                  Implemented clean architecture, RESTful APIs, and responsive
                  UIs.
                </li>
                <li>Integrated secure authentication and scalable database logic.</li>
              </ul>
            </div>
          </div>
        </section> */}

        {/* Projects */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Projects
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            <li>
              <strong>Institute Management System</strong> — A full-featured
              MERN web app with admin dashboard and content management.
            </li>
            <li>
              <strong>Turf Management SaaS</strong> — Online turf booking and
              management system with OTP verification and payment tracking.
            </li>
          </ul>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Education
          </h2>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Next Level Web development
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ongoing</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Masters of Business Administration (MBA)
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Major in Marketing | Ongoing
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
