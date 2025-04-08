import { SetStateAction, useCallback, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { RootState } from "../app/store";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Rating ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const EmotionPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { calls, loading, error } = useSelector((state: RootState) => state.dailyCalls);

  const chartData = useMemo(() => {
    if (loading || error || !calls.length) {
      return [];
    }

    const ratingsByDate = calls.reduce((acc: { [key: string]: number[] }, call) => {
      if (!acc[call.date]) {
        acc[call.date] = [];
      }
      acc[call.date].push(call.rating);
      return acc;
    }, {});

    return Object.entries(ratingsByDate).map(([date, ratings]) => ({
      name: date,
      value: ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length,
    }));
  }, [calls, loading, error]);

  const onPieEnter = useCallback(
    (_: any, index: SetStateAction<number>) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!chartData.length) {
    return <div>No data available</div>;
  }

  return (
    <PieChart width={440} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={chartData}
        cx={220}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};
