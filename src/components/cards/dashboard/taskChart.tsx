"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type Props = {
  pending: number;
  doing: number;
  done: number;
};

export function TasksChart({ pending, doing, done }: Props) {
  const data = [
    { name: "Pendentes", value: pending },
    { name: "Em Progresso", value: doing },
    { name: "Concluídas", value: done },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
