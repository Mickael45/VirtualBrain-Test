import Home from "@/pages/Home/Home";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen grid items-center bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900">
      <Toaster />
      <Home />
    </div>
  );
}

export default App;
