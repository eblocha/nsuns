import { FaSlidersH } from 'react-icons/fa';
import ToolbarButton from '../ToolbarButton';

const Settings = () => {
  return (
    <ToolbarButton title="Edit Settings" aria-label="edit settings">
      <FaSlidersH />
    </ToolbarButton>
  );
};

export default Settings;
