
// import { useNavigate } from "react-router-dom";
// import {
//   Box, Typography, Button, Grid, Card, CardContent
// } from "@mui/material";

// import DescriptionIcon from "@mui/icons-material/Description";
// import PsychologyIcon from "@mui/icons-material/Psychology";
// import SpeedIcon from "@mui/icons-material/Speed";
// import BarChartIcon from "@mui/icons-material/BarChart";

// function HomePage() {

//   const navigate = useNavigate();

//   const features = [
//     {
//       title: "OCR Extraction",
//       desc: "Extract text from handwritten answer sheets",
//       icon: <DescriptionIcon sx={{ fontSize: 40, color: "#3b82f6" }} />
//     },
//     {
//       title: "AI Evaluation",
//       desc: "Evaluate answers using NLP similarity",
//       icon: <PsychologyIcon sx={{ fontSize: 40, color: "#06b6d4" }} />
//     },
//     {
//       title: "Instant Results",
//       desc: "Get marks instantly without manual correction",
//       icon: <SpeedIcon sx={{ fontSize: 40, color: "#22c55e" }} />
//     },
//     {
//       title: "Analytics",
//       desc: "Visualize student performance with charts",
//       icon: <BarChartIcon sx={{ fontSize: 40, color: "#f59e0b" }} />
//     }
//   ];

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #0f172a, #1e293b)",
//         color: "white",
//         px: 3,
//         py: 6
//       }}
//     >

//       {/* 🔥 HERO SECTION */}
//       <Box textAlign="center" mb={6}>

//         <Typography
//           variant="h2"
//           sx={{
//             fontWeight: "bold",
//             background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent"
//           }}
//         >
//           AI AutoGrader
//         </Typography>

//         <Typography sx={{ mt: 2, color: "#94a3b8", fontSize: "1.1rem" }}>
//           Automated Evaluation of Answer Sheets using Artificial Intelligence
//         </Typography>

//         {/* 🔥 Illustration */}
//         <Box mt={4}>
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/4149/4149653.png"
//             alt="AI Illustration"
//             style={{ width: "120px", opacity: 0.9 }}
//           />
//         </Box>

//       </Box>

//       {/* 🔥 FEATURES */}
//       <Grid container spacing={3} justifyContent="center">

//         {features.map((f, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>

//             <Card
//               sx={{
//                 background: "rgba(255,255,255,0.06)",
//                 backdropFilter: "blur(12px)",
//                 borderRadius: "15px",
//                 color: "white",
//                 textAlign: "center",
//                 transition: "0.3s",
//                 border: "1px solid rgba(255,255,255,0.1)",

//                 "&:hover": {
//                   transform: "translateY(-8px)",
//                   boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
//                 }
//               }}
//             >
//               <CardContent>

//                 {/* 🔥 ICON */}
//                 <Box mb={2}>
//                   {f.icon}
//                 </Box>

//                 <Typography variant="h6" fontWeight="bold">
//                   {f.title}
//                 </Typography>

//                 <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1 }}>
//                   {f.desc}
//                 </Typography>

//               </CardContent>
//             </Card>

//           </Grid>
//         ))}

//       </Grid>

//       {/* 🔥 BUTTONS */}
//       <Box textAlign="center" mt={7}>

//         <Button
//           onClick={() => navigate("/teacher")}
//           sx={{
//             mr: 2,
//             px: 5,
//             py: 1.5,
//             borderRadius: "12px",
//             fontWeight: "bold",
//             background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
//             color: "white",
//             boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
//             "&:hover": {
//               background: "linear-gradient(135deg, #2563eb, #0891b2)"
//             }
//           }}
//         >
//           Teacher Panel
//         </Button>

//         <Button
//           onClick={() => navigate("/student")}
//           sx={{
//             px: 5,
//             py: 1.5,
//             borderRadius: "12px",
//             fontWeight: "bold",
//             border: "1px solid rgba(255,255,255,0.2)",
//             color: "white",
//             "&:hover": {
//               background: "rgba(255,255,255,0.1)"
//             }
//           }}
//         >
//           Student Portal
//         </Button>

//       </Box>

//     </Box>
//   );
// }

// export default HomePage;
import { useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, Grid, Card, CardContent
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SpeedIcon from "@mui/icons-material/Speed";
import BarChartIcon from "@mui/icons-material/BarChart";

function HomePage() {

  const navigate = useNavigate();

  const features = [
    {
      title: "OCR Extraction",
      desc: "Extract text from handwritten answer sheets",
      icon: <DescriptionIcon sx={{ fontSize: 40, color: "#3b82f6" }} />
    },
    {
      title: "AI Evaluation",
      desc: "Evaluate answers using NLP similarity",
      icon: <PsychologyIcon sx={{ fontSize: 40, color: "#06b6d4" }} />
    },
    {
      title: "Instant Results",
      desc: "Get marks instantly without manual correction",
      icon: <SpeedIcon sx={{ fontSize: 40, color: "#22c55e" }} />
    },
    {
      title: "Analytics",
      desc: "Visualize student performance with charts",
      icon: <BarChartIcon sx={{ fontSize: 40, color: "#f59e0b" }} />
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        px: 3,
        py: 6
      }}
    >

      {/* 🔥 HERO */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          AI AutoGrader
        </Typography>

        <Typography sx={{ mt: 2, color: "#94a3b8", fontSize: "1.1rem" }}>
          Automated Evaluation of Answer Sheets using Artificial Intelligence
        </Typography>

        <Box mt={4}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4149/4149653.png"
            alt="AI Illustration"
            style={{ width: "120px", opacity: 0.9 }}
          />
        </Box>
      </Box>

      {/* 🔥 FEATURES */}
      <Grid container spacing={3} justifyContent="center">
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              sx={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                borderRadius: "15px",
                color: "white",
                textAlign: "center",
                transition: "0.3s",
                border: "1px solid rgba(255,255,255,0.1)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                }
              }}
            >
              <CardContent>
                <Box mb={2}>{f.icon}</Box>

                <Typography variant="h6" fontWeight="bold">
                  {f.title}
                </Typography>

                <Typography variant="body2" sx={{ color: "#94a3b8", mt: 1 }}>
                  {f.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🔥 BUTTONS */}
      <Box textAlign="center" mt={7}>

        {/* ADMIN */}
        <Button
          onClick={() => navigate("/login", { state: { role: "admin" } })}
          sx={btnPrimary}
        >
          Admin Panel
        </Button>

        {/* TEACHER */}
        <Button
          onClick={() => navigate("/teacher-login", { state: { role: "teacher" } })}
          sx={btnPrimary}
        >
          Teacher Login
        </Button>

        {/* STUDENT */}
        <Button
          onClick={() => navigate("/student")}
          sx={btnSecondary}
        >
          Student Portal
        </Button>

      </Box>

    </Box>
  );
}

/* 🔥 STYLES */
const btnPrimary = {
  mr: 2,
  px: 5,
  py: 1.5,
  borderRadius: "12px",
  fontWeight: "bold",
  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
  color: "white",
  boxShadow: "0 4px 20px rgba(59,130,246,0.5)",
  "&:hover": {
    background: "linear-gradient(135deg, #2563eb, #0891b2)"
  }
};

const btnSecondary = {
  px: 5,
  py: 1.5,
  borderRadius: "12px",
  fontWeight: "bold",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  "&:hover": {
    background: "rgba(255,255,255,0.1)"
  }
};

export default HomePage;