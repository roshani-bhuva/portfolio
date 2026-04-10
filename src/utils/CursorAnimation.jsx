import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const VARIANT_RING = {
  default: "border-2 border-accent/60 bg-accent/10 backdrop-blur-[1px]",
  orange: "border-2 border-orange-500/70 bg-orange-500/15 backdrop-blur-[1px]",
};

export default function CustomCursor({ variant = "default" }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(28);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOverText = () => {
      setCursorSize(56);
    };

    const handleMouseLeaveText = () => {
      setCursorSize(28);
    };

    const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

    textElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseOverText);
      el.addEventListener("mouseleave", handleMouseLeaveText);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      textElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseOverText);
        el.removeEventListener("mouseleave", handleMouseLeaveText);
      });
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className={`fixed pointer-events-none z-[60] hidden rounded-full md:block ${VARIANT_RING[variant] ?? VARIANT_RING.default}`}
      style={{ width: cursorSize, height: cursorSize }}
      animate={{ x: cursorPosition.x - cursorSize / 2, y: cursorPosition.y - cursorSize / 2 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    />
  );
}

CustomCursor.propTypes = {
  variant: PropTypes.oneOf(["default", "orange"]),
};
