// import { useState } from "react";
// import { evaluateAnswer } from "../services/api";

// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Grid
// } from "@mui/material";

// function UploadForm() {

//   const [name, setName] = useState("");
//   const [rollno, setRollno] = useState("");
//   const [studentPdf, setStudentPdf] = useState(null);
//   const [solutionPdf, setSolutionPdf] = useState(null);
//   const [result, setResult] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("rollno", rollno);
//     formData.append("student_pdf", studentPdf);
//     formData.append("solution_pdf", solutionPdf);

//     const res = await evaluateAnswer(formData);
//     setResult(res.data);
//   };

//   return (
//     <Card
//       sx={{
//         borderRadius: 4,
//         background: "rgba(255,255,255,0.05)",
//         backdropFilter: "blur(10px)",
//         boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
//         color: "white"
//       }}
//     >
//       <CardContent>

//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//           Upload Answer Sheets
//         </Typography>

//         <form onSubmit={handleSubmit}>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Student Name"
//                 fullWidth
//                 onChange={(e)=>setName(e.target.value)}
//                 sx={textFieldStyle}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 label="Roll Number"
//                 fullWidth
//                 onChange={(e)=>setRollno(e.target.value)}
//                 sx={textFieldStyle}
//               />
//             </Grid>
//           </Grid>

//           {/* File Upload */}
//           <Box sx={{ mt: 3 }}>
//             <Typography>Student Answer PDF</Typography>
//             <Button variant="outlined" component="label" sx={{ mt: 1 }}>
//               Upload File
//               <input hidden type="file" onChange={(e)=>setStudentPdf(e.target.files[0])} />
//             </Button>
//           </Box>

//           <Box sx={{ mt: 2 }}>
//             <Typography>Solution PDF</Typography>
//             <Button variant="outlined" component="label" sx={{ mt: 1 }}>
//               Upload File
//               <input hidden type="file" onChange={(e)=>setSolutionPdf(e.target.files[0])} />
//             </Button>
//           </Box>

//           <Button
//             variant="contained"
//             size="large"
//             type="submit"
//             sx={{
//               mt: 3,
//               borderRadius: 3,
//               px: 4,
//               background: "linear-gradient(45deg, #2196F3, #21CBF3)"
//             }}
//           >
//             Evaluate
//           </Button>

//         </form>

//         {/* RESULT */}
//         {result && (
//           <Box sx={{ mt: 4 }}>
//             <Typography variant="h6">Evaluation Report</Typography>

//             {Object.entries(result.question_results).map(([q, val]) => (
//               <Box
//                 key={q}
//                 sx={{
//                   mt: 2,
//                   p: 2,
//                   borderRadius: 3,
//                   background: "rgba(255,255,255,0.05)"
//                 }}
//               >
//                 <Typography fontWeight="bold">{q}</Typography>
//                 <Typography>Marks: {val.marks}</Typography>
//                 <Typography color="gray">
//                   Similarity: {val.similarity}
//                 </Typography>
//               </Box>
//             ))}

//             <Box sx={{ mt: 3 }}>
//               <Typography>
//                 Total: {result.obtained_marks} / {result.total_marks}
//               </Typography>

//               <Typography color="#4caf50">
//                 Percentage: {result.percentage}%
//               </Typography>
//             </Box>

//           </Box>
//         )}

//       </CardContent>
//     </Card>
//   );
// }

// const textFieldStyle = {
//   input: { color: "white" },
//   label: { color: "#bbb" },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": { borderColor: "#555" },
//     "&:hover fieldset": { borderColor: "#888" },
//   },
// };

// export default UploadForm;
import { useState, useEffect } from "react";
import { submitStudent, getExams } from "../services/api";

import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  MenuItem
} from "@mui/material";

function UploadForm() {

  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [studentPdf, setStudentPdf] = useState(null);

  const [studentName, setStudentName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");

  // 🔥 Fetch exams
  useEffect(() => {
    async function fetchExams() {
      try {
        const res = await getExams();
        setExams(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchExams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedExam) {
      alert("Please select exam");
      return;
    }

    const formData = new FormData();
    formData.append("exam_name", selectedExam);
    formData.append("name", name);
    formData.append("rollno", rollno);
    formData.append("student_pdf", studentPdf);

    setLoading(true);

    try {
      const res = await submitStudent(formData);
      setResult(res.data);
    } catch (err) {
      alert("Error evaluating");
    }

    setLoading(false);
  };

  return (
    <Card
      sx={{
        borderRadius: 4,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        color: "white",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.02)" }
      }}
    >
      <CardContent>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Upload Answer Sheets
        </Typography>

        <form onSubmit={handleSubmit}>

          {/* 🔥 EXAM DROPDOWN */}
          <TextField
            select
            label="Select Exam"
            fullWidth
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            sx={{ ...textFieldStyle, mb: 2 }}
          >
            {[...new Set(exams)].map((exam, i) => (
  <MenuItem key={i} value={exam}>
    {exam}
  </MenuItem>
))}
          </TextField>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Student Name"
                fullWidth
                onChange={(e)=>setName(e.target.value)}
                sx={textFieldStyle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Roll Number"
                fullWidth
                onChange={(e)=>setRollno(e.target.value)}
                sx={textFieldStyle}
              />
            </Grid>
          </Grid>

          {/* Student PDF */}
          <Box sx={{ mt: 3 }}>
            <Typography>Student Answer PDF</Typography>

            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              Upload File
              <input hidden type="file" onChange={(e)=>{
                setStudentPdf(e.target.files[0]);
                setStudentName(e.target.files[0]?.name);
              }} />
            </Button>

            <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
              {studentName}
            </Typography>
          </Box>

          {/* Button */}
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={loading}
            sx={{
              mt: 3,
              borderRadius: 3,
              px: 4,
              background: "linear-gradient(45deg, #2196F3, #21CBF3)"
            }}
          >
            {loading ? "Evaluating..." : "Evaluate"}
          </Button>

        </form>

        {/* RESULT */}
        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Evaluation Report</Typography>

            {Object.entries(result.question_results).map(([q, val]) => (
              <Box
                key={q}
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.05)"
                }}
              >
                <Typography fontWeight="bold">{q}</Typography>

                <Typography>Marks: {val.marks}</Typography>

                <Typography color="gray">
                  Similarity: {val.similarity}
                </Typography>

                {/* 🔥 NEW FEATURES */}
                <Typography color="orange" sx={{ mt: 1 }}>
                  Feedback: {val.feedback}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Your Answer: {val.student_answer}
                </Typography>

                <Typography variant="body2">
                  Correct Answer: {val.solution_answer}
                </Typography>
              </Box>
            ))}

            <Box sx={{ mt: 3 }}>
              <Typography>
                Total: {result.obtained_marks} / {result.total_marks}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#00e676"
                }}
              >
                {result.percentage}%
              </Typography>
            </Box>

          </Box>
        )}

      </CardContent>
    </Card>
  );
}

const textFieldStyle = {
  input: { color: "white" },
  label: { color: "#bbb" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#555" },
    "&:hover fieldset": { borderColor: "#888" },
  },
};

export default UploadForm;