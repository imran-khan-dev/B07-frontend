"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollAndUnlock() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Re-enable scroll on mobile (fix overflow issue)
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "auto";
    body.style.overflow = "auto";
    html.style.overflowY = "auto";
    body.style.overflowY = "auto";
    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";
  }, [pathname]);

  return null;
}
