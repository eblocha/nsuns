import { useCallback, useMemo } from 'react';
import useProfile from '../../hooks/useProfile';
import useProgram from '../../hooks/useProgram';
import useReps, { useUpdateReps } from '../../hooks/useReps';
import { flattenHistory } from '../../utils/program';
import StatList from './StatList';

const RepStats = () => {
  const [profile] = useProfile();
  const { data: reps } = useReps(profile);
  const { data: program } = useProgram(profile);

  const flattened = useMemo(() => {
    return reps && program ? flattenHistory(program, reps) : [];
  }, [program, reps]);

  const { mutate } = useUpdateReps(profile);

  const onEdit = useCallback(
    (id: string, value: string): boolean => {
      if (value === '') {
        mutate({
          reps: {
            [id]: null,
          },
        });
        return true;
      }
      const reps: number = parseInt(value);
      if (isNaN(reps)) {
        return false;
      }
      mutate({
        reps: {
          [id]: reps,
        },
      });

      return true;
    },
    [mutate]
  );

  return <StatList stats={flattened} title="Reps" onEdit={onEdit} />;
};

export default RepStats;
