"use client";

import { PropsTaskCharts } from "@//types/manyType";
import {PieChart,Pie,Cell,ResponsiveContainer,Tooltip,Legend} from "recharts";

export function TasksChart({ pending, doing, done }: PropsTaskCharts) {
  const data = [
    { name: "Pendentes", value: pending },
    { name: "Em Progresso", value: doing },
    { name: "Concluídas", value: done },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
  <div
    className="w-full h-[260px] sm:h-[300px] lg:h-80 bg-white dark:bg-zinc-900
      border border-zinc-200 dark:border-zinc-800 rounded-2xl p-3 sm:p-4 shadow-sm"
  >
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip
          contentStyle={{
            backgroundColor: "#18181b",
            border: "none",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#fff" }}
        />

        <Legend
          wrapperStyle={{
            fontSize: "12px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
}
