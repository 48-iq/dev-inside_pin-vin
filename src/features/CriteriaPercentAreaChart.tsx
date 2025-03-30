import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { RootState } from "../app/store";
import { useMemo } from "react";

const toPercent = (decimal: number, fixed: number = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};

const renderTooltipContent = (o: any) => {
  const { payload = [], label } = o;
  const total = payload.reduce(
    (result: number, entry: any) => result + entry.value,
    0
  );

  return (
    <div>
      <p>{`${label} (Total: ${total})`}</p>
      <ul>
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const CriteriaPercentAreaChart = () => {
  const { calls, loading, error } = useSelector((state: RootState) => state.dailyCalls);

  const chartData = useMemo(() => {
    if (loading || error || !calls.length) {
      return [];
    }

    return calls.map((call) => ({
      name: call.date,
      contact: call.checklistScores.contact,
      effectiveCommunication: call.checklistScores.effectiveCommunication,
      presentation: call.checklistScores.presentation,
      convincingArguments: call.checklistScores.convincingArguments,
      resultOrientation: call.checklistScores.resultOrientation,
      initiative: call.checklistScores.initiative,
      clientOrientation: call.checklistScores.clientOrientation,
      cpm: call.checklistScores.cpm,
    }));
  }, [calls, loading, error]);

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
    <AreaChart
      width={700}
      height={150}
      data={chartData}
      stackOffset="expand"
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={toPercent} />
      <Tooltip content={renderTooltipContent} />
      <Area
        type="monotone"
        dataKey="contact"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
        name="Contact"
      />
      <Area
        type="monotone"
        dataKey="effectiveCommunication"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
        name="Effective Communication"
      />
      <Area
        type="monotone"
        dataKey="presentation"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
        name="Presentation"
      />
      <Area
        type="monotone"
        dataKey="convincingArguments"
        stackId="1"
        stroke="#ff7300"
        fill="#ff7300"
        name="Convincing Arguments"
      />
      <Area
        type="monotone"
        dataKey="resultOrientation"
        stackId="1"
        stroke="#00c49f"
        fill="#00c49f"
        name="Result Orientation"
      />
      <Area
        type="monotone"
        dataKey="initiative"
        stackId="1"
        stroke="#ffbb28"
        fill="#ffbb28"
        name="Initiative"
      />
      <Area
        type="monotone"
        dataKey="clientOrientation"
        stackId="1"
        stroke="#ff6384"
        fill="#ff6384"
        name="Client Orientation"
      />
      <Area
        type="monotone"
        dataKey="cpm"
        stackId="1"
        stroke="#36a2eb"
        fill="#36a2eb"
        name="CPM"
      />
    </AreaChart>
  );
};
