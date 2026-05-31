


// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// import ExamSetup from "../components/ExamSetup";
// import StudentTable from "../components/StudentTable";

// // ❌ WRONG: PerfomanceChart
// // ✅ FIXED:
// import PerformanceChart from "../components/PerfomanceChart";

// import StatsCards from "../components/StatsCards";

// import { Container, Typography, Button, Box } from "@mui/material";

// function TeacherPage() {

//   const navigate = useNavigate();

//   // 🔥 Store student data for chart + stats
//   const [studentsData, setStudentsData] = useState([]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0f172a, #1e293b)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         px: 2,
//         pb: 5
//       }}
//     >

//       <Container maxWidth="lg">

//         {/* 🔥 TITLE */}
//         <Box textAlign="center" sx={{ mt: 6, mb: 4 }}>
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: "bold",
//               background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent"
//             }}
//           >
//             AI AutoGrader
//           </Typography>

//           <Typography sx={{ color: "#94a3b8", mt: 1 }}>
//             Automated Answer Sheet Evaluation System
//           </Typography>
//         </Box>

//         {/* 🔥 EXAM SETUP */}
//         <Box display="flex" justifyContent="center">
//           <ExamSetup />
//         </Box>

//         {/* 🔥 NAVIGATION BUTTON */}
//         <Box textAlign="center" mt={4}>
//           <Button
//             onClick={() => navigate("/student")}
//             sx={{
//               px: 5,
//               py: 1.5,
//               borderRadius: "12px",
//               fontWeight: "bold",
//               letterSpacing: "1px",
//               background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
//               color: "white",
//               boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #2563eb, #0891b2)"
//               }
//             }}
//           >
//             Go to Student Upload →
//           </Button>
//         </Box>

//         {/* 🔥 STUDENT TABLE */}
//         <Box mt={6} display="flex" justifyContent="center">
//           <StudentTable setStudentsData={setStudentsData} />
//         </Box>

//         {/* 🔥 DASHBOARD (STATS + CHART) */}
//         {studentsData.length > 0 && (
//           <>
//             {/* 🔥 STATS CARDS */}
//             <Box mt={6}>
//               <StatsCards data={studentsData} />
//             </Box>

//             {/* 🔥 PERFORMANCE CHART */}
//             <Box mt={6}>
//               <PerformanceChart data={studentsData} />
//             </Box>
//           </>
//         )}

//       </Container>

//     </Box>
//   );
// }

// export default TeacherPage;
import { useNavigate } from "react-router-dom";

import ExamSetup from "../components/ExamSetup";
import UploadForm from "../components/UploadForm";

import { Container, Typography, Button, Box } from "@mui/material";

function TeacherPage() {

  const navigate = useNavigate();

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
            AI AutoGrader
          </Typography>

          <Typography sx={{ color: "#94a3b8", mt: 1 }}>
            Admin Panel - Manage Exams & Upload Sheets
          </Typography>
        </Box>

        {/* 🔥 EXAM SETUP */}
        <Box display="flex" justifyContent="center">
          <ExamSetup />
        </Box>

        {/* 🔥 STUDENT UPLOAD */}
        <Box mt={6} display="flex" justifyContent="center">
          <UploadForm />
        </Box>

        {/* 🔥 NAVIGATION BUTTON */}
        <Box textAlign="center" mt={5}>
          <Button
            onClick={() => navigate("/teacher-dashboard")}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: "12px",
              fontWeight: "bold",
              letterSpacing: "1px",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              color: "white",
              boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb, #0891b2)"
              }
            }}
          >
            Go to Teacher Dashboard →
          </Button>
        </Box>

      </Container>

    </Box>
  );
}

export default TeacherPage;