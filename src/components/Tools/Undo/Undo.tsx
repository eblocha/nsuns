import { FaUndoAlt } from 'react-icons/fa';
import { useUndoUpdate } from '../../../hooks/useUndoUpdate';
import ToolbarButton from '../ToolbarButton';

const Undo = () => {
  return (
    <ToolbarButton onClick={useUndoUpdate()}>
      <FaUndoAlt />
    </ToolbarButton>
  );
};

export default Undo;
