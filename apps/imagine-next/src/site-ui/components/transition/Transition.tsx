'use client';
import React from 'react';
import { TransitionProps } from './Transition.types';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5
    }
  }
};


export function Transition({ children }: TransitionProps) {
  const pathname = usePathname();
  return (
    <div className="effect-1">
      <AnimatePresence
        initial={false}
        mode="wait"
      >

        <motion.div

          key={pathname}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}