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

export const GPAAreaChart = () => {
  const { calls, loading, error } = useSelector((state: RootState) => state.dailyCalls);

  const chartData = useMemo(() => {
    if (loading || error || !calls.length) {
      return [];
    }

    return calls.map((call) => {
      const scores = call.checklistScores;
      const avgScore =
        (scores.contact +
          scores.effectiveCommunication +
          scores.presentation +
          scores.convincingArguments +
          scores.resultOrientation +
          scores.initiative +
          scores.clientOrientation +
          scores.cpm) / 8;

      return {
        name: call.date,
        avgScore: avgScore,
      };
    });
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
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="avgScore"
        stroke="#8884d8"
        fill="#8884d8"
        name="Average Score"
      />
    </AreaChart>
  );
};
