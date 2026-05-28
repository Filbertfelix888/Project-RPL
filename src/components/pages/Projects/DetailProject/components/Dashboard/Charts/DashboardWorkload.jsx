import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DashboardWorkload = ({ data }) => {

  console.log("CHART DATA =", data);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="assignee" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="taskCount"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardWorkload;