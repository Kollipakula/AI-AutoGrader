// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
// import UploadForm from "./components/UploadForm";

// function App() {
//   return (
//     <div className="container">
//       <h1>AI Answer Sheet Evaluation</h1>
//       <UploadForm />
//     </div>
//   );
// }

// export default App;

// import Dashboard from "./pages/Dashboard";

// function App() {
//   return <Dashboard />;
// }

// export default App;
// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import TeacherPage from "./pages/TeacherPage";
// import StudentPage from "./pages/StudentPage";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/teacher" element={<TeacherPage />} />
//       <Route path="/student" element={<StudentPage />} />
//       <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import TeacherDashboard from "./pages/TeacherDashBoard";
import AdminPage from "./pages/TeacherPage"; // reuse your TeacherPage as Admin
import StudentPage from "./pages/StudentPage"; // (will convert to result page)
import TeacherLogin from "./pages/TeacherLogin"
function App() {
  return (
    <Routes>

      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/teacher-login" element={<TeacherLogin />} />


      {/* TEACHER */}
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />

      {/* STUDENT */}
      <Route path="/student" element={<StudentPage />} />

    </Routes>
  );
}

export default App;