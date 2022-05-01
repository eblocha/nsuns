import { useCallback } from 'react';
import useStore from '../stores';
import useProfile from './useProfile';
import useProgram from './useProgram';

export const useNextSet = () => {
  const [profile] = useProfile();
  const { data: program } = useProgram(profile);
  const nextSet = useStore((state) => state.nextSet);

  return useCallback(() => {
    if (program) {
      nextSet(program);
    }
  }, [nextSet, program]);
};
