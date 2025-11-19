import { AnimatePresence, motion } from 'framer-motion'; // 修复：添加缺失的导入
export default function PageAnimate({ children }: any) {
  const pageVariants = {
    initial: { x: -20 },
    animate: { x: 0, transition: { duration: 0.5 } },
    exit: { x: -20, transition: { duration: 0.5 } },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
