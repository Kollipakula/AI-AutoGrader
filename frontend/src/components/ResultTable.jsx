import { useEffect, useState } from "react";
import { getResults } from "../services/api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableContainer
} from "@mui/material";

function ResultTable(){

  const [results, setResults] = useState([]);

  useEffect(()=>{
    async function fetchResults(){
      const res = await getResults();
      setResults(res.data);
    }
    fetchResults();
  },[]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 4,
        background: "rgba(255,255,255,0.05)",
        color: "white"
      }}
    >
      <Typography sx={{ p: 2 }} variant="h6">
        Evaluation History
      </Typography>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Roll No</TableCell>
            <TableCell sx={{ color: "white" }}>Marks</TableCell>
            <TableCell sx={{ color: "white" }}>Percentage</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {results.map((r,i)=>(
            <TableRow key={i}>
              <TableCell sx={{ color: "white" }}>{r.name}</TableCell>
              <TableCell sx={{ color: "white" }}>{r.rollno}</TableCell>
              <TableCell sx={{ color: "white" }}>
                {r.result?.obtained_marks} / {r.result?.total_marks}
              </TableCell>
              <TableCell sx={{ color: "#4caf50" }}>
                {r.result?.percentage} %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default ResultTable;