import { Card } from "@/components/ui/card";

export const AboutContent = () => {
  return (
    <section className="relative sm:py-20 py-22 overflow-hidden">
      {/* Background gradient (top ↔ bottom, center soft white/black) */}
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

      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center gap-16">
        {/* Header */}
        <div className="text-center px-6 sm:px-10">
          <h1 className="mx-auto mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:max-w-3xl">
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 md:text-lg">
            Learn more about my journey, my passion for web development, and the
            values that drive me to build meaningful digital products.
          </p>
        </div>

        {/* Main Content */}
        <Card className="border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm mx-3 shadow-lg sm:col-span-12 lg:col-span-10 lg:col-start-2 rounded-2xl p-6 sm:p-10">
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            {/* Left: Image */}
            <div className="flex justify-center border border-gray-200 rounded-2xl">
              <div className="aspect-square overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 md:w-7xl sm:w-80 shadow-md">
                <img
                  src="https://i.imgur.com/960qgFH.jpeg"
                  alt="Profile"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Hi, I’m Imran Khan
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                I’m a <span className="font-medium">Full Stack Developer</span>{" "}
                passionate about designing and building user-focused web
                applications. I specialize in creating fast, accessible, and
                responsive experiences that blend functionality with aesthetics.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                My journey started with a curiosity about how the web works —
                which turned into a full-time passion for clean architecture,
                reusable components, and problem-solving through code.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                I’ve built several projects — from a school management system to
                a full-featured Turf Management SaaS — focusing on real-world
                utility, scalability, and elegant UI.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Outside of coding, I enjoy exploring UI design trends, learning
                new tools, and staying curious about how technology can empower
                people and communities.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
