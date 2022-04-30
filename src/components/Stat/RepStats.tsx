import { useMemo } from 'react';
import useProfile from '../../hooks/useProfile';
import useReps from '../../hooks/useReps';
import { flatten } from '../../utils/maxes';
import StatList from './StatList';

const RepStats = () => {
  const [profile] = useProfile();
  const { data: reps } = useReps(profile);

  const flattened = useMemo(() => {
    return reps ? flatten(reps) : [];
  }, [reps]);

  return <StatList stats={flattened} title="Reps" />;
};

export default RepStats;
