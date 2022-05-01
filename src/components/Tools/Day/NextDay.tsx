import React, { useCallback } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import useDay from '../../../hooks/useDay';

const NextDay = () => {
  const [day, setDay] = useDay();

  const increment = useCallback(() => {
    day === 6 ? setDay(0) : setDay(day + 1);
  }, [day, setDay]);

  return (
    <button
      className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 m-0.5 flex items-center justify-center"
      onClick={increment}
    >
      <FaArrowRight />
    </button>
  );
};

export default NextDay;
