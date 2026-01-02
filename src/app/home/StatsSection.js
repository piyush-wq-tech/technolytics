// src/app/home/StatsSection.jsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function StatsSection() {
  const stats = [
    { percent: "15–25%", title: "Improvement in", subtitle: "Forecast Accuracy" },
    { percent: "10–15%", title: "Reduction in", subtitle: "Inventory" },
    { percent: "8–10%", title: "Reduction", subtitle: "in Carbon Emissions" },
    { percent: "20–35%", title: "Improvement in", subtitle: "Planner Productivity" },
  ];

  const scrollRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDevice = () => setIsMobile(window.innerWidth < 768);
    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  // Only duplicate if mobile
  const displayStats = isMobile ? [...stats, ...stats] : stats;

  useEffect(() => {
    if (!isMobile) return;

    const scroller = scrollRef.current;
    let frame;
    let pos = 0;

    const loop = () => {
      pos += 0.6;
      if (pos >= scroller.scrollWidth / 2) pos = 0;
      scroller.scrollLeft = pos;
      frame = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(frame);
  }, [isMobile]);

  return (
    <section className="
      w-full bg-gradient-to-r from-black via-[#041012] to-black
      pt-28 pb-24 md:py-28
      flex items-center
    ">
      <div
        ref={scrollRef}
        className="
          flex md:grid md:grid-cols-4 md:gap-14
          gap-12 px-6 items-center
          overflow-x-auto md:overflow-visible
          whitespace-nowrap md:whitespace-normal
          scrollbar-none 
          min-h-[200px] md:min-h-0
          mx-auto md:max-w-7xl
        "
      >
        {displayStats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            className="
              relative min-w-[250px] md:min-w-0 text-center
              cursor-pointer group
            "
          >
            {/* Percent */}
            <motion.h2
              className="
                text-6xl font-light text-white
                drop-shadow-[0_0_18px_#00ffe1]
              "
              animate={{ textShadow: "0 0 30px #00ffe1" }}
              transition={{ repeat: Infinity, duration: 2, repeatType: "mirror" }}
            >
              {item.percent}
            </motion.h2>

            {/* Subtitle */}
            <p className="
              text-[#00ffe1] text-lg mt-4 tracking-wide
              drop-shadow-[0_0_10px_#00ffe1a0]
            ">
              {item.title}
              <br /> {item.subtitle}
            </p>

            {/* Divider on desktop only — not after last item */}
            {i < stats.length - 1 && !isMobile && (
              <div className="
                hidden md:block h-24 w-[2px]
                bg-[#003d38] absolute right-[-35px] top-1/2 -translate-y-1/2
                group-hover:bg-[#00ffe1]
                group-hover:shadow-[0_0_20px_#00ffe1]
                transition-all duration-500
              "></div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
