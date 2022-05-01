import { FaAngleDoubleRight } from 'react-icons/fa';
import { useNextSet } from '../../../hooks/useNextSet';
import ToolbarButton from '../ToolbarButton';

const NextSet = () => {
  return (
    <ToolbarButton onClick={useNextSet()}>
      <FaAngleDoubleRight />
    </ToolbarButton>
  );
};

export default NextSet;
