import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles/main.scss";
import downloadFile from "@public/assets/images/download.jpeg";

const App = () => {
  console.log("Hello webpack");
  return (
    <>
      <h1>Hello Webpack</h1>
      <div style={{ height: 200 }}>
        <img src={downloadFile} alt="img" />
      </div>

      <BrowserRouter basename="/g">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                home
                <Link to="/about">Click me</Link>
              </div>
            }
          />
          <Route path="/about" element={<div>about</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
