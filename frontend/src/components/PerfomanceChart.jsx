// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

// import { Card, CardContent, Typography } from "@mui/material";

// function PerformanceChart({ data }) {

//   return (
//     <Card
//       sx={{
//         borderRadius: "20px",
//         padding: "20px",
//         width: "100%",
//         maxWidth: "800px",
//         margin: "auto",

//         background: "rgba(255,255,255,0.06)",
//         backdropFilter: "blur(20px)",
//         border: "1px solid rgba(255,255,255,0.1)",
//         boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
//         color: "white"
//       }}
//     >
//       <CardContent>

//         <Typography variant="h6" gutterBottom>
//           Student Performance Chart
//         </Typography>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>

//             <CartesianGrid strokeDasharray="3 3" stroke="#444" />

//             <XAxis dataKey="name" stroke="#ccc" />
//             <YAxis stroke="#ccc" />

//             <Tooltip />

//             <Bar dataKey="percentage" fill="#3b82f6" />

//           </BarChart>
//         </ResponsiveContainer>

//       </CardContent>
//     </Card>
//   );
// }

// export default PerformanceChart;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

import { Card, CardContent, Typography, Box } from "@mui/material";

function PerformanceChart({ data }) {

  // 🔥 COLORS BASED ON PERFORMANCE
  const getColor = (value) => {
    if (value < 50) return "#ef4444";   // red
    if (value < 75) return "#f59e0b";   // yellow
    return "#22c55e";                  // green
  };

  return (
    <Card
      sx={{
        borderRadius: "20px",
        padding: "20px",
        width: "100%",
        maxWidth: "900px",
        margin: "auto",

        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        color: "white"
      }}
    >
      <CardContent>

        <Typography variant="h6" gutterBottom fontWeight="bold">
          📊 Student Performance Overview
        </Typography>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#444" />

            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "none",
                borderRadius: "10px",
                color: "white"
              }}
            />

            {/* 🔥 ANIMATED BAR */}
            <Bar
              dataKey="percentage"
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.percentage)} />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}

export default PerformanceChart;

