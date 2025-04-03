import { motion } from 'motion/react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 border-8 border-[#16803C] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-[#16803C] font-medium">Chargement...</div>
      </motion.div>
    </div>
  );
};
