import { FaUndoAlt } from 'react-icons/fa';
import { useUndoUpdate } from '../../../hooks/useUndoUpdate';
import ToolbarButton from '../ToolbarButton';

const Undo = () => {
  return (
    <ToolbarButton
      onClick={useUndoUpdate()}
      title="Undo Update"
      aria-label="undo update"
    >
      <FaUndoAlt />
    </ToolbarButton>
  );
};

export default Undo;
