import React from 'react';
import { FaFileExport } from 'react-icons/fa';
import ToolbarButton from '../ToolbarButton';

const Export = () => {
  return (
    <ToolbarButton title="Export JSON" aria-label="export JSON">
      <FaFileExport />
    </ToolbarButton>
  );
};

export default Export;
