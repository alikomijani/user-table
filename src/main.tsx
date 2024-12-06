import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Timer from "./Timer.tsx";

createRoot(document.getElementById("root")!).render(<Timer />);
