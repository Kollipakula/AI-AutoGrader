
// import { useEffect, useState } from "react";
// import { getStudents, getExams } from "../services/api";
// import LinearProgress from "@mui/material/LinearProgress";

// import {
//   Table, TableBody, TableCell, TableHead, TableRow,
//   Select, MenuItem, Card, CardContent, Typography,
//   Box, FormControl, InputLabel
// } from "@mui/material";

// // 🔥 RECEIVE setStudentsData FROM PARENT
// function StudentTable({ setStudentsData }) {

//   const [exam, setExam] = useState("");
//   const [data, setData] = useState([]);
//   const [exams, setExams] = useState([]);

//   // 🔥 FETCH EXAMS
//   useEffect(() => {
//     getExams().then(res => setExams(res.data));
//   }, []);

//   // 🔥 FETCH STUDENTS + SEND DATA TO CHART
//   useEffect(() => {
//     if (exam) {
//       getStudents(exam).then(res => {

//         const students = res.data;

//         setData(students);

//         // 🔥 IMPORTANT: SEND DATA TO PARENT (FOR CHART)
//         if (setStudentsData) {
//           setStudentsData(
//             students.map(d => ({
//               name: d.name,
//               percentage: d.percentage
//             }))
//           );
//         }
//       });
//     }
//   }, [exam]);

//   return (

//     <Card sx={{
//       borderRadius: "20px",
//       padding: "20px",
//       width: "100%",
//       maxWidth: "800px",

//       background: "rgba(255,255,255,0.06)",
//       backdropFilter: "blur(20px)",
//       border: "1px solid rgba(255,255,255,0.1)",
//       boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
//       transition: "0.3s",

//       color: "white",

//       "&:hover": {
//         transform: "translateY(-5px)",
//         boxShadow: "0 12px 50px rgba(0,0,0,0.6)"
//       }
//     }}>

//       <CardContent>

//         <Typography variant="h5" gutterBottom fontWeight="bold">
//           Student Results
//         </Typography>

//         {/* 🔥 EXAM SELECTION */}
//         <Box sx={{ mb: 3 }}>
//           <FormControl fullWidth>

//             <InputLabel sx={{ color: "#94a3b8" }}>
//               Select Exam
//             </InputLabel>

//             <Select
//               value={exam}
//               label="Select Exam"
//               onChange={(e) => setExam(e.target.value)}
//               sx={{
//                 color: "white",
//                 borderRadius: "12px",

//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(255,255,255,0.2)"
//                 },

//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#3b82f6"
//                 },

//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#06b6d4"
//                 },

//                 "& .MuiSvgIcon-root": {
//                   color: "white"
//                 }
//               }}

//               MenuProps={{
//                 PaperProps: {
//                   sx: {
//                     backgroundColor: "#1e293b",
//                     color: "white"
//                   }
//                 }
//               }}
//             >
//              {[...new Set(exams)].map((e, i) => (
//   <MenuItem key={i} value={e}>{e}</MenuItem>
// ))}
//             </Select>

//           </FormControl>
//         </Box>

//         {/* 🔥 TABLE */}
//         <Table>

//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}><strong>Roll Number</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Name</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Total Marks</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Percentage</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Progress</strong></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>

//             {data.length > 0 ? (
//               data.map((d, i) => (

//                 <TableRow key={i}>

//                   <TableCell sx={{ color: "white" }}>
//                     {d.rollno}
//                   </TableCell>

//                   <TableCell sx={{ color: "white" }}>
//                     {d.name}
//                   </TableCell>

//                   <TableCell sx={{ color: "white" }}>
//                     {d.marks}/{d.total}
//                   </TableCell>

//                   {/* 🔥 COLOR BASED ON PERFORMANCE */}
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       color: d.percentage < 65 ? "#ef4444" : "#22c55e"
//                     }}
//                   >
//                     {d.percentage}%
//                   </TableCell>

//                   {/* 🔥 PROGRESS BAR */}
//                   <TableCell sx={{ width: "200px" }}>
//                     <LinearProgress
//                       variant="determinate"
//                       value={(d.marks / d.total) * 100}
//                       sx={{
//                         height: 8,
//                         borderRadius: 5,
//                         backgroundColor: "#1e293b",
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor:
//                             d.percentage < 65 ? "#ef4444" : "#22c55e"
//                         }
//                       }}
//                     />
//                   </TableCell>

//                 </TableRow>

//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={5} align="center" sx={{ color: "#94a3b8" }}>
//                   No data available
//                 </TableCell>
//               </TableRow>
//             )}

//           </TableBody>

//         </Table>

//       </CardContent>

//     </Card>
//   );
// }

// export default StudentTable;

// import { useEffect, useState } from "react";
// import { getStudents, getExams } from "../services/api";
// import LinearProgress from "@mui/material/LinearProgress";
// import axios from "axios";
// import QuestionEditModal from "./QuestionEditModal";
// import {
//   Table, TableBody, TableCell, TableHead, TableRow,
//   Select, MenuItem, Card, CardContent, Typography,
//   Box, FormControl, InputLabel, Button
// } from "@mui/material";

// // 🔥 RECEIVE setStudentsData FROM PARENT
// function StudentTable({ setStudentsData, isTeacher }) {

//   const [exam, setExam] = useState("");
//   const [data, setData] = useState([]);
//   const [exams, setExams] = useState([]);

//   // 🔥 EDIT STATES
//   const [editRow, setEditRow] = useState(null);
//   const [newMarks, setNewMarks] = useState("");

//   // 🔥 FETCH EXAMS
//   useEffect(() => {
//     getExams().then(res => setExams(res.data));
//   }, []);

//   // 🔥 FETCH STUDENTS + SEND DATA TO CHART
//   useEffect(() => {
//     if (exam) {
//       getStudents(exam).then(res => {

//         const students = res.data;

//         setData(students);

//         if (setStudentsData) {
//           setStudentsData(
//             students.map(d => ({
//               name: d.name,
//               percentage: d.percentage
//             }))
//           );
//         }
//       });
//     }
//   }, [exam]);

//   // 🔥 UPDATE MARKS API
//   const updateMarks = async (rollno) => {
//     try {
//       await axios.put("http://localhost:8000/update-marks", {
//         rollno,
//         marks: newMarks
//       });

//       alert("✅ Marks updated");

//       setEditRow(null);

//       // 🔥 REFRESH DATA WITHOUT RELOAD
//       const res = await getStudents(exam);
//       setData(res.data);

//     } catch {
//       alert("❌ Error updating marks");
//     }
//   };

//   return (

//     <Card sx={{
//       borderRadius: "20px",
//       padding: "20px",
//       width: "100%",
//       maxWidth: "800px",

//       background: "rgba(255,255,255,0.06)",
//       backdropFilter: "blur(20px)",
//       border: "1px solid rgba(255,255,255,0.1)",
//       boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
//       transition: "0.3s",

//       color: "white",

//       "&:hover": {
//         transform: "translateY(-5px)",
//         boxShadow: "0 12px 50px rgba(0,0,0,0.6)"
//       }
//     }}>

//       <CardContent>

//         <Typography variant="h5" gutterBottom fontWeight="bold">
//           Student Results
//         </Typography>

//         {/* 🔥 EXAM SELECTION */}
//         <Box sx={{ mb: 3 }}>
//           <FormControl fullWidth>

//             <InputLabel sx={{ color: "#94a3b8" }}>
//               Select Exam
//             </InputLabel>

//             <Select
//               value={exam}
//               label="Select Exam"
//               onChange={(e) => setExam(e.target.value)}
//               sx={{
//                 color: "white",
//                 borderRadius: "12px",

//                 "& .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "rgba(255,255,255,0.2)"
//                 },

//                 "&:hover .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#3b82f6"
//                 },

//                 "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#06b6d4"
//                 },

//                 "& .MuiSvgIcon-root": {
//                   color: "white"
//                 }
//               }}

//               MenuProps={{
//                 PaperProps: {
//                   sx: {
//                     backgroundColor: "#1e293b",
//                     color: "white"
//                   }
//                 }
//               }}
//             >
//               {[...new Set(exams)].map((e, i) => (
//                 <MenuItem key={i} value={e}>{e}</MenuItem>
//               ))}
//             </Select>

//           </FormControl>
//         </Box>

//         {/* 🔥 TABLE */}
//         <Table>

//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}><strong>Roll Number</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Name</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Total Marks</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Percentage</strong></TableCell>
//               <TableCell sx={{ color: "white" }}><strong>Progress</strong></TableCell>
//               {isTeacher && <TableCell sx={{ color: "white" }}><strong>Edit</strong></TableCell>}
//             </TableRow>
//           </TableHead>

//           <TableBody>

//             {data.length > 0 ? (
//               data.map((d, i) => (

//                 <TableRow key={i}>

//                   <TableCell sx={{ color: "white" }}>
//                     {d.rollno}
//                   </TableCell>

//                   <TableCell sx={{ color: "white" }}>
//                     {d.name}
//                   </TableCell>

//                   {/* 🔥 EDITABLE MARKS */}
//                   <TableCell sx={{ color: "white" }}>
//                     {isTeacher && editRow === i ? (
//                       <input
//                         value={newMarks}
//                         onChange={(e) => setNewMarks(e.target.value)}
//                         style={{ width: "60px" }}
//                       />
//                     ) : (
//                       `${d.marks}/${d.total}`
//                     )}
//                   </TableCell>

//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       color: d.percentage < 65 ? "#ef4444" : "#22c55e"
//                     }}
//                   >
//                     {d.percentage}%
//                   </TableCell>

//                   <TableCell sx={{ width: "200px" }}>
//                     <LinearProgress
//                       variant="determinate"
//                       value={(d.marks / d.total) * 100}
//                       sx={{
//                         height: 8,
//                         borderRadius: 5,
//                         backgroundColor: "#1e293b",
//                         "& .MuiLinearProgress-bar": {
//                           backgroundColor:
//                             d.percentage < 65 ? "#ef4444" : "#22c55e"
//                         }
//                       }}
//                     />
//                   </TableCell>

//                   {/* 🔥 EDIT BUTTON */}
//                   {isTeacher && (
//                     <TableCell>
//                       {editRow === i ? (
//                         <Button
//                           size="small"
//                           variant="contained"
//                           onClick={() => updateMarks(d.rollno)}
//                         >
//                           Save
//                         </Button>
//                       ) : (
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           onClick={() => {
//                             setEditRow(i);
//                             setNewMarks(d.marks);
//                           }}
//                         >
//                           Edit
//                         </Button>
//                       )}
//                     </TableCell>
//                   )}

//                 </TableRow>

//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center" sx={{ color: "#94a3b8" }}>
//                   No data available
//                 </TableCell>
//               </TableRow>
//             )}

//           </TableBody>

//         </Table>

//       </CardContent>

//     </Card>
//   );
// }

// export default StudentTable;
import { useEffect, useState } from "react";
import { getStudents, getExams } from "../services/api";
import LinearProgress from "@mui/material/LinearProgress";
import QuestionEditModal from "./QuestionEditModal";

import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Select, MenuItem, Card, CardContent, Typography,
  Box, FormControl, InputLabel, Button
} from "@mui/material";

function StudentTable({ setStudentsData, isTeacher }) {

  const [exam, setExam] = useState("");
  const [data, setData] = useState([]);
  const [exams, setExams] = useState([]);

  // 🔥 MODAL STATES
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // 🔥 FETCH EXAMS
  useEffect(() => {
    getExams().then(res => setExams(res.data));
  }, []);

  // 🔥 FETCH STUDENTS
  useEffect(() => {
    if (exam) {
      getStudents(exam).then(res => {

        const students = res.data;
        setData(students);

        if (setStudentsData) {
          setStudentsData(
            students.map(d => ({
              name: d.name,
              percentage: d.percentage
            }))
          );
        }
      });
    }
  }, [exam]);

  return (

    <Card sx={{
      borderRadius: "20px",
      padding: "20px",
      width: "100%",
      maxWidth: "800px",
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
      color: "white"
    }}>

      <CardContent>

        <Typography variant="h5" gutterBottom fontWeight="bold">
          Student Results
        </Typography>

        {/* 🔥 EXAM SELECT */}
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>

            <InputLabel sx={{ color: "#94a3b8" }}>
              Select Exam
            </InputLabel>

            <Select
              value={exam}
              label="Select Exam"
              onChange={(e) => setExam(e.target.value)}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.2)"
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3b82f6"
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#06b6d4"
                }
              }}
            >
              {[...new Set(exams)].map((e, i) => (
                <MenuItem key={i} value={e}>{e}</MenuItem>
              ))}
            </Select>

          </FormControl>
        </Box>

        {/* 🔥 TABLE */}
        <Table>

          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}><strong>Roll Number</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Name</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Total Marks</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Percentage</strong></TableCell>
              <TableCell sx={{ color: "white" }}><strong>Progress</strong></TableCell>
              {isTeacher && <TableCell sx={{ color: "white" }}><strong>Edit</strong></TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>

            {data.length > 0 ? (
              data.map((d, i) => (

                <TableRow key={i}>

                  <TableCell sx={{ color: "white" }}>
                    {d.rollno}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {d.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {d.marks}/{d.total}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: d.percentage < 65 ? "#ef4444" : "#22c55e"
                    }}
                  >
                    {d.percentage}%
                  </TableCell>

                  <TableCell sx={{ width: "200px" }}>
                    <LinearProgress
                      variant="determinate"
                      value={(d.marks / d.total) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: "#1e293b",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            d.percentage < 65 ? "#ef4444" : "#22c55e"
                        }
                      }}
                    />
                  </TableCell>

                  {/* 🔥 NEW EDIT BUTTON */}
                  {isTeacher && (
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          setSelectedStudent(d);
                          setOpenModal(true);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  )}

                </TableRow>

              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ color: "#94a3b8" }}>
                  No data available
                </TableCell>
              </TableRow>
            )}

          </TableBody>

        </Table>

      </CardContent>

      {/* 🔥 MODAL */}
      {selectedStudent && (
        <QuestionEditModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          student={selectedStudent}
        />
      )}

    </Card>
  );
}

export default StudentTable;