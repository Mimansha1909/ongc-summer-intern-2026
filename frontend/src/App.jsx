import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import heroImage from "./assets/hero.png";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/reports"
      );
      setReports(response.data);
    } catch (error) {
      console.error(error);
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

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="app">

      {/* HERO */}
      <section className="hero">

        <div className="hero-left">

          <h4>ONGC</h4>

          <h1>
            Inspection Report
            <br />
            Management &
            <br />
            Analysis System
          </h1>

          <p>
            Digitize inspection reports, store records securely,
            and manage inspection reports efficiently.
          </p>

          <div className="upload-box">

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <br />

            <button onClick={uploadFile}>
              Upload Report
            </button>

          </div>

        </div>

        <div className="hero-right">

          <img
            src={heroImage}
            alt="Inspection"
          />

        </div>

      </section>

      {/* RESULT */}

      {result && (

        <section className="result-section">

          <div className="result-box">

            <h2>Upload Result</h2>

            <p>
              <strong>File :</strong> {result.filename}
            </p>

            <p>
              <strong>Status :</strong> {result.status}
            </p>

            <h3>Parsed Data</h3>

            {Object.keys(result.parsed_data).length > 0 ? (

              <pre>
                {JSON.stringify(
                  result.parsed_data,
                  null,
                  2
                )}
              </pre>

            ) : (

              <p>No inspection data detected.</p>

            )}

            <h3>Extracted Text</h3>

            <div className="text-box">
              {result.extracted_text}
            </div>

          </div>

        </section>

      )}

      {/* REPORTS */}

      <section className="reports-section">

        <h2>Stored Reports</h2>

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

            {reports.length > 0 ? (

              reports.map((report) => (

                <tr key={report.id}>

                  <td>{report.id}</td>

                  <td>{report.inspection_id || "-"}</td>

                  <td>{report.severity || "-"}</td>

                  <td>{report.location || "-"}</td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="4" style={{ textAlign: "center" }}>
                  No reports uploaded yet.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </section>

    </div>
  );
}

export default App;