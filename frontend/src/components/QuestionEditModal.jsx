// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Box,
//   Typography
// } from "@mui/material";

// function QuestionEditModal({ open, onClose, student }) {

//   const [questions, setQuestions] = useState(
//     student?.result?.question_results || {}
//   );

//   // 🔥 Handle change
//   const handleChange = (q, value) => {
//     setQuestions(prev => ({
//       ...prev,
//       [q]: {
//         ...prev[q],
//         marks: value
//       }
//     }));
//   };

//   // 🔥 Save all updates
//   const handleSave = async () => {
//     try {
//       for (let q in questions) {
//         await axios.put("http://localhost:8000/update-question-marks", {
//           rollno: student.rollno,
//           question: q,
//           marks: questions[q].marks
//         });
//       }

//       toast.success("Updated successfully 🔥");
//       onClose();

//     } catch {
//       toast.error("Error updating");
//     }
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>

//       <DialogTitle color="black">
//         Edit Marks 
//       </DialogTitle>

//       <DialogContent>

//         {Object.entries(questions).map(([q, val]) => (

//           <Box key={q} display="flex" alignItems="center" gap={2} mt={2}>

//             <Typography sx={{ width: "60px" }}>
//               {q}
//             </Typography>

//             <TextField
//               type="number"
//               value={val.marks}
//               onChange={(e) => handleChange(q, e.target.value)}
//               size="small"
//             />

//           </Box>

//         ))}

//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>

//         <Button variant="contained" onClick={handleSave}>
//           Save
//         </Button>
//       </DialogActions>

//     </Dialog>
//   );
// }

// export default QuestionEditModal;
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from "@mui/material";

function QuestionEditModal({ open, onClose, student }) {

  const [questions, setQuestions] = useState({});

  // 🔥 FIX: Sync when student changes
  useEffect(() => {
    setQuestions(student?.result?.question_results || {});
  }, [student]);

  // 🔥 Handle input change
  const handleChange = (q, value) => {
    setQuestions(prev => ({
      ...prev,
      [q]: {
        ...prev[q],
        marks: value
      }
    }));
  };

  // 🔥 Save updated marks
  const handleSave = async () => {
    try {
      for (let q in questions) {
        await axios.put("http://localhost:8000/update-question-marks", {
          rollno: student.rollno,
          question: q,
          marks: questions[q].marks
        });
      }

      toast.success("Marks updated successfully 🚀");

      handleClose();

    } catch {
      toast.error("Error updating marks");
    }
  };

  // 🔥 Close modal safely
  const handleClose = () => {
    setQuestions({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          background: "rgba(30, 41, 59, 0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          color: "white"
        }
      }}
    >

      {/* 🔥 TITLE */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.5rem",
          background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Edit Question Marks
      </DialogTitle>

      {/* 🔥 CONTENT */}
      <DialogContent>

        {Object.entries(questions).map(([q, val]) => (

          <Box
            key={q}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
              p: 2,
              borderRadius: "12px",
              background: "rgba(255,255,255,0.05)"
            }}
          >

            {/* QUESTION */}
            <Typography fontWeight="bold">
              {q}
            </Typography>

            {/* INPUT */}
            <TextField
              type="number"
              value={val.marks}
              onChange={(e) => handleChange(q, e.target.value)}
              size="small"
              sx={{
                width: "120px",

                "& .MuiInputBase-input": {
                  color: "white",
                  textAlign: "center"
                },

                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
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

          </Box>

        ))}

      </DialogContent>

      {/* 🔥 ACTIONS */}
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>

        <Button
          onClick={handleClose}
          sx={{ color: "#94a3b8" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            px: 4,
            borderRadius: "10px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            boxShadow: "0 4px 20px rgba(59,130,246,0.5)"
          }}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default QuestionEditModal;