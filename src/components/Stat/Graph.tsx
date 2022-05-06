import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

type IProps = {
  data: number[];
};

const lineColor = 'rgb(29, 78, 216)';
const lineStyle: React.CSSProperties = { strokeWidth: 3 };
const spotStyle: React.CSSProperties = {
  stroke: lineColor,
  strokeWidth: 2,
  fill: lineColor,
};

const wrapperStyle: React.CSSProperties = {
  height: '9rem',
  width: '36rem',
};

export const Graph = ({ data }: IProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center px-2"
      style={wrapperStyle}
    >
      <Sparklines data={data} height={60} width={240} margin={5}>
        <SparklinesLine color={lineColor} style={lineStyle} />
        <SparklinesSpots size={3} style={spotStyle} />
      </Sparklines>
    </div>
  );
};
