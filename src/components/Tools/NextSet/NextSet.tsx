import { FaAngleDoubleRight } from 'react-icons/fa';
import { useNextSet } from '../../../hooks/useNextSet';
import ToolbarButton from '../ToolbarButton';

const NextSet = () => {
  return (
    <ToolbarButton
      onClick={useNextSet()}
      title="Next Set"
      aria-label="next set"
    >
      <FaAngleDoubleRight />
    </ToolbarButton>
  );
};

export default NextSet;
