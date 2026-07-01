import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Upload from "./components/Upload";
import Reports from "./components/Reports";
import About from "./components/About";
import ReportsModal from "./components/ReportsModal";

function App() {
  const [page, setPage] = useState("dashboard");

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/reports");
      setReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      setResult(response.data);
      fetchReports();
      alert("Report Uploaded Successfully!");
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    }
  };

  const filteredReports = reports.filter((report) => {
    const value = search.toLowerCase();

    return (
      (report.inspection_id || "").toLowerCase().includes(value) ||
      (report.severity || "").toLowerCase().includes(value) ||
      (report.location || "").toLowerCase().includes(value)
    );
  });

  return (
    <div className="app">
      <Header />

      <div className="container">
    <Sidebar
    page={page}
    setPage={setPage}
/>

        <main className="content">

          {/* DASHBOARD */}
          {page === "dashboard" && (
  <Dashboard reports={reports}/>
)}

          {page === "upload" && (

  <Upload
    file={file}
    setFile={setFile}
    uploadFile={uploadFile}
    result={result}
  />

)}


         {page === "reports" && (

  <>

    <input
      className="search-box"
      type="text"
      placeholder="Search by Inspection ID, Severity or Location..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
    />


    <Reports
  reports={filteredReports}
  setSelectedReport={setSelectedReport}
/>

  </>

)}

          {page === "about" && (
  <About />
)}
<ReportsModal
  report={selectedReport}
  closeModal={() => setSelectedReport(null)}
/>
        </main>
      </div>
    </div>
  );
}

export default App;