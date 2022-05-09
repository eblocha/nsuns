import { AnimatePresence, Variants, motion, Transition } from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';
import useDay from '../../hooks/useDay';
import NextDay from '../Tools/Day/NextDay';
import PrevDay from '../Tools/Day/PrevDay';
import CurrentDay from './CurrentDay';

const variants: Variants = {
  enter: (direction: number) => {
    return {
      zIndex: 0,
      x: direction > 0 ? 1000 : -1000,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const transition: Transition = {
  opacity: { duration: 0.3 },
  x: { type: 'tween', duration: 0.3 },
};

const DayColumn = () => {
  const [day] = useDay();

  const prevDay = useRef(day);

  useLayoutEffect(() => {
    prevDay.current = day;
  }, [day]);

  let direction = 0;
  if (day === 0 && prevDay.current === 6) {
    direction = 1;
  } else if (day === 6 && prevDay.current === 0) {
    direction = -1;
  } else {
    direction = day - prevDay.current;
  }

  return (
    <div className="flex flex-row items-center overflow-hidden">
      <div className="pr-2 shrink-0">
        <PrevDay />
      </div>
      <div className="flex-1 h-full overflow-hidden relative">
        <div className="w-full h-full absolute overflow-clip">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={day}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="w-full h-full absolute"
            >
              <CurrentDay day={day} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="pl-2 shrink-0">
        <NextDay />
      </div>
    </div>
  );
};

export default DayColumn;
