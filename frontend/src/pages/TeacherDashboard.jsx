import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StudentTable from "../components/StudentTable";
import StatsCards from "../components/StatsCards";
import PerformanceChart from "../components/PerfomanceChart";

import { Container, Typography, Box, Button } from "@mui/material";

function TeacherDashboard() {

  const navigate = useNavigate();

  const [studentsData, setStudentsData] = useState([]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        pb: 5
      }}
    >

      <Container maxWidth="lg">

        {/* 🔥 TITLE */}
        <Box textAlign="center" sx={{ mt: 6, mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Teacher Dashboard
          </Typography>

          <Typography sx={{ color: "#94a3b8", mt: 1 }}>
            View & Manage Student Results
          </Typography>
        </Box>

        {/* 🔥 BACK BUTTON */}
        <Box textAlign="center" mb={3}>
          <Button
            onClick={() => navigate("/admin")}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white"
            }}
          >
            ← Back to Admin Panel
          </Button>
        </Box>

        {/* 🔥 STUDENT TABLE */}
        <Box display="flex" justifyContent="center">
          <StudentTable setStudentsData={setStudentsData} isTeacher />
        </Box>

        {/* 🔥 STATS + CHART */}
        {studentsData.length > 0 && (
          <>
            <Box mt={6}>
              <StatsCards data={studentsData} />
            </Box>

            <Box mt={6}>
              <PerformanceChart data={studentsData} />
            </Box>
          </>
        )}

      </Container>

    </Box>
  );
}

export default TeacherDashboard;
