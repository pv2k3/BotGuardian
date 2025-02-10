import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export function AnalysisCharts({ data }) {
  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "var(--radius)",
    color: "white",
  };

  const labelStyle = {
    color: "white",
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="backdrop-blur-sm bg-card/50 transition-all duration-300 hover:bg-card/70 hover:shadow-lg hover:scale-[1.01]">
        <CardHeader>
          <CardTitle>Posting Frequency</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.postingFrequency}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                itemStyle={labelStyle}
              />
              <Bar 
                dataKey="posts" 
                fill="hsl(217.2, 91.2%, 59.8%)"
                className="transition-opacity duration-200 hover:opacity-80"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="backdrop-blur-sm bg-card/50 transition-all duration-300 hover:bg-card/70 hover:shadow-lg hover:scale-[1.01]">
        <CardHeader>
          <CardTitle>Engagement Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.engagement}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                labelLine={{ stroke: "hsl(var(--muted-foreground))" }}
              >
                {data.engagement.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-opacity duration-200 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={labelStyle}
                itemStyle={labelStyle}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}