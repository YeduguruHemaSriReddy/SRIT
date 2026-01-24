import { motion } from "framer-motion";

const StatsCard = ({
  value,
  label,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden rounded-xl group hover:-translate-y-1 transition-all duration-300">
        <div className="p-8 text-center relative">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

          <h3 className="text-5xl font-extrabold text-blue-600 mb-2 tracking-tight">
            {value}
          </h3>

          <p className="text-xl font-bold text-gray-800 mb-2">
            {label}
          </p>

          {description && (
            <p className="text-sm text-gray-500">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
