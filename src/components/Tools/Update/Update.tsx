import { FaSyncAlt } from 'react-icons/fa';
import { useUpdate } from '../../../hooks/useUpdate';
import ToolbarButton from '../ToolbarButton';

export const Update = () => {
  return (
    <ToolbarButton
      onClick={useUpdate()}
      title="Update Maxes"
      aria-label="update maxes"
    >
      <FaSyncAlt />
    </ToolbarButton>
  );
};
