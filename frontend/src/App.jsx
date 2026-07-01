
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [page, setPage] = useState("dashboard");

  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [reports, setReports] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/reports"
      );

      setReports(response.data);

    }

    catch (error) {

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

    }

    catch (error) {

      console.log(error);

      alert("Upload Failed");

    }

  };

  const filteredReports = reports.filter((report) => {

    const value = search.toLowerCase();

    return (

      (report.inspection_id || "")
        .toLowerCase()
        .includes(value)

      ||

      (report.severity || "")
        .toLowerCase()
        .includes(value)

      ||

      (report.location || "")
        .toLowerCase()
        .includes(value)

    );

  });

  return (

    <div className="app">

      <header className="header">

        <h1>
          Inspection Report Management &
          Analysis System
        </h1>

        <p>
          ONGC Summer Internship • 2026
        </p>

      </header>

      <div className="container">

        <aside className="sidebar">

          <h2>Inspection Portal</h2>

          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("upload")}>
            Upload Report
          </button>

          <button onClick={() => setPage("reports")}>
            Reports
          </button>

          <button onClick={() => setPage("about")}>
            About
          </button>

        </aside>

        <main className="content">

          {/* DASHBOARD */}

          {page === "dashboard" && (

            <>

              <h1>Dashboard</h1>

              <p>
                Welcome to the Inspection Report
                Management & Analysis System.
              </p>

              <div className="cards">

                <div className="card">

<h2>📄 {reports.length}</h2>

<p>Total Reports</p>

</div>

                <div className="card">

<h2>

⚠️ {

reports.filter(
(r)=>r.severity==="High"
).length

}

</h2>

<p>High Severity</p>

</div>

               <div className="card">

<h2>

📍 {

new Set(
reports.map(r=>r.location)
).size

}

</h2>

<p>Locations</p>

</div>

                <div className="card">

<h2>

💾

{

reports.length>0
?
" Online"
:
" Offline"

}

</h2>

<p>Database</p>

</div>

              </div>

            </>

          )}

          {/* UPLOAD */}

          {page === "upload" && (

            <>

              <h1>
                Upload Inspection Report
              </h1>

              <p className="upload-text">

                Upload PDF or Image inspection
                reports. OCR will automatically
                extract the report data.

              </p>

              <div className="upload-card">

                <input

                  type="file"

                  onChange={(e) =>
                    setFile(e.target.files[0])
                  }

                />

                <button onClick={uploadFile}>

                  Upload Report

                </button>

              </div>

              {result && (

                <div className="result-card">

                  <h2>

                    Upload Successful

                  </h2>

                  <p>

                    <strong>File :</strong>

                    {result.filename}

                  </p>

                  <p>

                    <strong>Status :</strong>

                    {result.status}

                  </p>

                </div>

              )}

            </>

          )}

          {/* REPORTS */}

          {page === "reports" && (

            <>

              <h1>

                Stored Reports

              </h1>

              <input

                className="search-box"

                type="text"

                placeholder="Search by Inspection ID, Severity or Location..."

                value={search}

                onChange={(e) =>
                  setSearch(e.target.value)
                }

              />

              <table>

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Inspection ID</th>

                    <th>Severity</th>

                    <th>Location</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    filteredReports.length > 0

                    ?

                    (

                      filteredReports.map(

                        (report) => (

                          <tr key={report.id}>

                            <td>{report.id}</td>

                            <td>{report.inspection_id || "-"}</td>

                            <td>

  <span
    className={`badge ${
      report.severity === "High"
        ? "high"
        : report.severity === "Medium"
        ? "medium"
        : report.severity === "Low"
        ? "low"
        : "unknown"
    }`}
  >

    {report.severity || "-"}

  </span>

</td>

                            <td>{report.location || "-"}</td>

                          </tr>

                        )

                      )

                    )

                    :

                    (

                      <tr>

                        <td colSpan="4">

                          No Matching Reports

                        </td>

                      </tr>

                    )

                  }

                </tbody>

              </table>

            </>

          )}

          {/* ABOUT */}

          {page === "about" && (

            <>

              <h1>About</h1>

              <p>

                Inspection Report
                Management &
                Analysis System

              </p>

              <br />

              <p>

                Developed during
                ONGC Summer Internship
                2026.

              </p>

            </>

          )}

        </main>

      </div>

    </div>

  );

}

export default App;

