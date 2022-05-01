import React, { useCallback } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import useDay from '../../../hooks/useDay';

const PrevDay = () => {
  const [day, setDay] = useDay();

  const decrement = useCallback(() => {
    day === 0 ? setDay(6) : setDay(day - 1);
  }, [day, setDay]);

  return (
    <button
      className="w-12 h-12 rounded-full bg-gray-600 hover:bg-gray-500 m-0.5 flex items-center justify-center"
      onClick={decrement}
    >
      <FaArrowLeft />
    </button>
  );
};

export default PrevDay;
