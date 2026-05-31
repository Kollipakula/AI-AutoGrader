// import { useNavigate } from "react-router-dom";
// import UploadForm from "../components/UploadForm";

// import { Container, Typography, Button, Box } from "@mui/material";

// function StudentPage() {

//   const navigate = useNavigate();

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

//       <Container maxWidth="md">

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
//             Student Portal
//           </Typography>

//           <Typography sx={{ color: "#94a3b8", mt: 1 }}>
//             Upload your answer sheet for AI-based evaluation
//           </Typography>
//         </Box>

//         {/* 🔥 UPLOAD FORM */}
//         <Box display="flex" justifyContent="center">
//           <UploadForm />
//         </Box>

//         {/* 🔥 BACK BUTTON */}
//         <Box textAlign="center" mt={4}>
//           <Button
//             onClick={() => navigate("/")}
//             sx={{
//               px: 4,
//               py: 1.2,
//               borderRadius: "10px",
//               fontWeight: "bold",
//               border: "1px solid rgba(255,255,255,0.2)",
//               color: "white",
//               "&:hover": {
//                 background: "rgba(255,255,255,0.1)"
//               }
//             }}
//           >
//             ← Back to Teacher Panel
//           </Button>
//         </Box>

//       </Container>

//     </Box>
//   );
// }

// export default StudentPage;

import { useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent
} from "@mui/material";

function StudentPage() {

  const [rollno, setRollno] = useState("");
  const [data, setData] = useState(null);

  const fetchResult = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/get-result/${rollno}`);
      setData(res.data);
    } catch {
      alert("Result not found");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        py: 5,
        color: "white"
      }}
    >

      {/* 🔥 TITLE */}
      <Typography variant="h3" sx={{ mb: 3 }}>
        Student Portal
      </Typography>

      {/* 🔥 INPUT */}
      {/* <Box display="flex" gap={2} mb={4}>
        <TextField
          label="Enter Registration Number"
          onChange={(e) => setRollno(e.target.value)}
          sx={{ background: "white", borderRadius: "5px" }}
        />

        <Button variant="contained" onClick={fetchResult}>
          Get Result
        </Button>
      </Box> */}
      <Box
  sx={{
    width: "100%",
    maxWidth: "500px",
    display: "flex",
    gap: 2,
    mb: 4
  }}
>

  <TextField
    placeholder="Enter Registration Number..."
    fullWidth
    onChange={(e) => setRollno(e.target.value)}
    sx={{
      "& .MuiInputBase-input": {
        color: "white"
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        background: "rgba(255,255,255,0.05)",

        "& fieldset": {
          borderColor: "rgba(255,255,255,0.2)"
        },

        "&:hover fieldset": {
          borderColor: "#3b82f6"
        },

        "&.Mui-focused fieldset": {
          borderColor: "#06b6d4"
        }
      }
    }}
  />

  <Button
    variant="contained"
    onClick={fetchResult}
    sx={{
      px: 3,
      borderRadius: "12px",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
      whiteSpace: "nowrap"
    }}
  >
    Get Result
  </Button>

</Box>

      {/* 🔥 RESULT */}
      {data && (
        <Card sx={{ maxWidth: "900px", width: "100%", p: 2, bgcolor: "#1e293b", color: "white" }}>
          <CardContent>

            {/* 🔥 BASIC INFO */}
            <Typography variant="h5" mb={2}>
              {data.name} ({data.exam_name})
            </Typography>

            <Typography>
              Total Marks: {data.result.obtained_marks} / {data.result.total_marks}
            </Typography>

            <Typography
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: data.result.percentage < 65 ? "#ef4444" : "#22c55e"
              }}
            >
              Percentage: {data.result.percentage}%
            </Typography>

            {/* 🔥 QUESTION WISE */}
            <Box mt={3}>
              <Typography variant="h6">Question-wise Analysis</Typography>

              {Object.entries(data.result.question_results).map(([q, val]) => (

                <Card
                  key={q}
                  sx={{
                    mt: 2,
                    p: 2,
                    background: "rgba(255,255,255,0.05)"
                  }}
                >

                  <Typography fontWeight="bold">{q}</Typography>

                  <Typography>Marks: {val.marks}</Typography>

                  <Typography sx={{ color: "#94a3b8" }}>
                    Similarity: {val.similarity}
                  </Typography>

                  <Typography sx={{ color: "#f59e0b", mt: 1 }}>
                    Feedback: {val.feedback}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    <strong>Your Answer:</strong> {val.student_answer}
                  </Typography>

                  <Typography>
                    <strong>Correct Answer:</strong> {val.solution_answer}
                  </Typography>

                </Card>

              ))}
            </Box>

          </CardContent>
        </Card>
      )}

    </Box>
  );
}

export default StudentPage;
