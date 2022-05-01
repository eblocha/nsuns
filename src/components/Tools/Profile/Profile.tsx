import { FaUser } from 'react-icons/fa';
import ToolbarButton from '../ToolbarButton';

const Profile = () => {
  return (
    <ToolbarButton title="Switch Profile" aria-label="switch profile">
      <FaUser />
    </ToolbarButton>
  );
};

export default Profile;
