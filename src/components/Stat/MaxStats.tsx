import { useMemo } from 'react';
import useMaxes from '../../hooks/useMaxes';
import useProfile from '../../hooks/useProfile';
import { flatten } from '../../utils/maxes';
import StatList from './StatList';

const MaxStats = () => {
  const [profile] = useProfile();
  const { data: maxes } = useMaxes(profile);

  const flattened = useMemo(() => {
    return maxes ? flatten(maxes) : [];
  }, [maxes]);

  return <StatList stats={flattened} title="Maxes" />;
};

export default MaxStats;
