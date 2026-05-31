import { Card, CardContent, Typography, Grid } from "@mui/material";

function StatsCards({ data }) {

  if (!data || data.length === 0) return null;

  const totalStudents = data.length;
  const avg =
    data.reduce((acc, d) => acc + d.percentage, 0) / totalStudents;

  const highest = Math.max(...data.map(d => d.percentage));
  const lowest = Math.min(...data.map(d => d.percentage));

  const stats = [
    { label: "Total Students", value: totalStudents },
    { label: "Average %", value: avg.toFixed(1) },
    { label: "Highest %", value: highest },
    { label: "Lowest %", value: lowest }
  ];

  return (
    <Grid container spacing={3} justifyContent="center">

      {stats.map((s, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Card
            sx={{
              borderRadius: "16px",
              textAlign: "center",
              padding: "20px",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              color: "white",
              boxShadow: "0 6px 30px rgba(0,0,0,0.3)"
            }}
          >
            <CardContent>
              <Typography variant="h6">{s.label}</Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ mt: 1, color: "#3b82f6" }}
              >
                {s.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

    </Grid>
  );
}

export default StatsCards;

