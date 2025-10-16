import { Linkedin, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

const ContactPage = () => {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Background gradient (top ↔ bottom) */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #3b82f6 0%, #ffffff 40%, #ffffff 60%, #3b82f6 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(to bottom, #010133 0%, #000000 40%, #000000 60%, #010133 100%)",
        }}
      />

      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 md:px-8 lg:px-16 gap-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Let’s Connect
          </h2>
          <p className="text-gray-600 dark:text-gray-300 md:text-lg">
            I’m always open to networking, collaborations, and new
            opportunities. Reach out through any of the platforms below — I’d
            love to hear from you!
          </p>
        </div>

        {/* Contact Card */}
        <Card className="border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-lg rounded-2xl p-8 md:p-10 text-center">
          <div className="flex flex-col items-center space-y-8">
            {/* Gmail */}
            <a
              href="mailto:example@gmail.com"
              className="inline-flex items-center gap-3 text-lg font-medium text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-600 dark:text-purple-400" />
              emranniloy84@gmail.com
            </a>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-10">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/imran-khan-438213358/"
                target="_blank"
                className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-purple-400 transition-transform transform hover:scale-110"
              >
                <Linkedin className="w-7 h-7" />
              </a>

              {/* WhatsApp (Custom SVG Icon) */}
              <a
                href="https://wa.me/qr/LO5XH64VEK4LE1"
                target="_blank"
                className="text-gray-800 dark:text-gray-100 hover:text-green-500 transition-transform transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M16.002 2.94c-7.27 0-13.17 5.9-13.17 13.17 0 2.32.61 4.58 1.78 6.57L2 30l7.59-2.37c1.9 1.05 4.04 1.6 6.27 1.6h.01c7.27 0 13.17-5.9 13.17-13.17 0-3.51-1.36-6.81-3.84-9.28a13.11 13.11 0 0 0-9.17-3.88zm0 23.75c-1.93 0-3.83-.5-5.5-1.46l-.39-.23-4.52 1.41 1.47-4.41-.25-.42a10.88 10.88 0 0 1-1.62-5.74c0-6.02 4.9-10.92 10.92-10.92 2.91 0 5.65 1.13 7.72 3.2a10.84 10.84 0 0 1 3.19 7.72c0 6.02-4.9 10.92-10.92 10.92zm6.12-8.19c-.33-.17-1.95-.96-2.26-1.07-.3-.11-.52-.17-.73.17-.22.33-.84 1.07-1.03 1.29-.19.22-.38.25-.7.08-.33-.17-1.4-.52-2.67-1.65a9.98 9.98 0 0 1-1.84-2.28c-.19-.33-.02-.51.15-.67.16-.16.33-.38.5-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.73-1.76-1-2.41-.26-.63-.53-.55-.73-.56-.19-.01-.41-.01-.63-.01s-.58.08-.89.41c-.3.33-1.17 1.14-1.17 2.77 0 1.63 1.2 3.2 1.37 3.42.17.22 2.36 3.6 5.72 5.06 3.36 1.46 3.36.97 3.97.91.61-.06 1.95-.79 2.23-1.55.28-.76.28-1.41.2-1.55-.08-.14-.3-.22-.63-.38z" />
                </svg>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ContactPage;
