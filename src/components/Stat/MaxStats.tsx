import { useCallback } from 'react';
import { useMemo } from 'react';
import useMaxes, { useUpdateMaxes } from '../../hooks/useMaxes';
import useProfile from '../../hooks/useProfile';
import useProgram from '../../hooks/useProgram';
import { flattenHistory } from '../../utils/program';
import StatList from './StatList';

const MaxStats = () => {
  const [profile] = useProfile();
  const { data: maxes } = useMaxes(profile);
  const { data: program } = useProgram(profile);

  const flattened = useMemo(() => {
    return maxes && program ? flattenHistory(program, maxes) : [];
  }, [maxes, program]);

  const { mutate } = useUpdateMaxes(profile);

  const onEdit = useCallback(
    (id: string, value: string): boolean => {
      const newMax = parseInt(value);
      if (isNaN(newMax)) {
        return false;
      }
      mutate({
        maxes: {
          [id]: newMax,
        },
      });

      return true;
    },
    [mutate]
  );

  return <StatList stats={flattened} title="Maxes" onEdit={onEdit} />;
};

export default MaxStats;
