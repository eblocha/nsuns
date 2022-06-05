import MaxStats from '../Stat/MaxStats';
import RepStats from '../Stat/RepStats';
import { Toolbar } from '../Tools/Toolbar';
import { Update } from '../Tools/Update/Update';
import Undo from '../Tools/Undo/Undo';
import NextSet from '../Tools/NextSet/NextSet';
import Edit from '../Tools/Edit/Edit';
import DayColumn from './DayColumn';

const MainView = () => {
  return (
    <div className="w-full h-full overflow-hidden grid grid-cols-3 gap-2 p-5">
      <DayColumn />
      <div className="col-span-2 flex flex-col overflow-hidden">
        <div className="grid grid-cols-2 gap-2 grow overflow-auto">
          <MaxStats />
          <RepStats />
        </div>
        <div className="py-1 shrink-0 flex flex-row items-center">
          <Toolbar className="mr-2">
            <Update />
            <Undo />
            <NextSet />
          </Toolbar>
          <Toolbar>
            <Edit />
          </Toolbar>
        </div>
      </div>
    </div>
  );
};

export default MainView;
