
import UploadForm from "../components/UploadForm";
import ResultTable from "../components/ResultTable";
import { Container, Typography, Box } from "@mui/material";

function Dashboard() {
  return (
   <Box
  sx={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    px: 2
  }}
>
      <Container maxWidth="lg">

        <Box textAlign="center" sx={{ pt: 6, pb: 4 }}>
          <Typography variant="h3" fontWeight="bold">
            AI AutoGrader
          </Typography>

          <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
            Automated Evaluation of Answer Sheets using AI
          </Typography>
        </Box>

        <UploadForm />

        <Box sx={{ mt: 4 }}>
          <ResultTable />
        </Box>

      </Container>
    </Box>
  );
}

export default Dashboard;

