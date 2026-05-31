// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();

//   const role = location.state?.role; // 🔥 role comes from button

//   const handleLogin = () => {
//     if (role === "admin" && username === "admin" && password === "admin123") {
//       localStorage.setItem("role", "admin");
//       navigate("/teacher");
//     } 
//     else if (role === "teacher" && username === "teacher" && password === "teacher123") {
//       localStorage.setItem("role", "teacher");
//       navigate("/teacher");
//     } 
//     else if (role === "student" && username === "student" && password === "student123") {
//       localStorage.setItem("role", "student");
//       navigate("/student");
//     } 
//     else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Login as {role}</h2>

//       <input
//         placeholder="Username"
//         onChange={(e) => setUsername(e.target.value)}
//       /><br /><br />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       /><br /><br />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent
} from "@mui/material";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "admin" && pass === "123") {
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2
      }}
    >

      <Card
        sx={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "20px",
          padding: "20px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          color: "white"
        }}
      >

        <CardContent>

          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            gutterBottom
          >
            Admin Login
          </Typography>

          {/* USERNAME */}
          <TextField
            label="Username"
            fullWidth
            onChange={(e) => setUser(e.target.value)}
            sx={textFieldStyle}
          />

          {/* PASSWORD */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPass(e.target.value)}
            sx={{ ...textFieldStyle, mt: 2 }}
          />

          {/* BUTTON */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: "10px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)"
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

        </CardContent>
      </Card>
    </Box>
  );
}

/* 🔥 INPUT STYLE FIX */
const textFieldStyle = {
  mt: 2,
  "& .MuiInputBase-input": {
    color: "white"
  },
  "& .MuiInputLabel-root": {
    color: "#94a3b8"
  },
  "& .MuiOutlinedInput-root": {
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
};

export default AdminLogin;