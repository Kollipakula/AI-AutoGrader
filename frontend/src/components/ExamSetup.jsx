import { useState } from "react";
import { createExam } from "../services/api";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";

function ExamSetup() {

  const [examName, setExamName] = useState("");
  const [solutionPdf, setSolutionPdf] = useState(null);

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("exam_name", examName);
    formData.append("solution_pdf", solutionPdf);

    await createExam(formData);

    alert("✅ Exam Created Successfully!");
  };

  return (

    <Card sx={{
  borderRadius: "20px",
  padding: "20px",
  width: "100%",
  maxWidth: "700px",
  background: "rgba(255,255,255,0.06)",
  color:"white",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 50px rgba(0,0,0,0.6)"
  }
}}>

      <CardContent>

        <Typography variant="h5" gutterBottom>
          Teacher Answer Upload
        </Typography>

        <TextField
          label="Exam Name"
          fullWidth
          margin="normal" 
          onChange={(e)=>setExamName(e.target.value)}
        />

        <Box mt={2}>
          <input type="file" onChange={(e)=>setSolutionPdf(e.target.files[0])}/>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Upload Answer Key
        </Button>

      </CardContent>

    </Card>
  );
}

export default ExamSetup;