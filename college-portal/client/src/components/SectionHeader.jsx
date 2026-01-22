import { motion } from "framer-motion";

const SectionHeader = ({
  title,
  subtitle,
  centered = false,
  className = "",
}) => {
  return (
    <div
      className={`mb-12 ${
        centered ? "text-center flex flex-col items-center" : ""
      } ${className}`}
    >
      {/* SUBTITLE */}
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-primary font-bold uppercase tracking-widest text-sm mb-3 block"
        >
          {subtitle}
        </motion.span>
      )}

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight relative"
      >
        {title}

        {/* UNDERLINE */}
        <span
          className={`absolute -bottom-3 h-1.5 bg-primary rounded-full ${
            centered
              ? "left-1/2 -translate-x-1/2 w-24"
              : "left-0 w-20"
          }`}
        />
      </motion.h2>
    </div>
  );
};

export default SectionHeader;
