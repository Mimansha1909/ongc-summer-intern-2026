function ReportsModal({ report, closeModal }) {

  if (!report) return null;

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          Inspection Report Details
        </h2>


        <p>
          <strong>File:</strong>{" "}
          {report.filename || "-"}
        </p>


        <p>
          <strong>Inspection ID:</strong>{" "}
          {report.inspection_id || "-"}
        </p>


        <p>
          <strong>Severity:</strong>{" "}
          {report.severity || "-"}
        </p>


        <p>
          <strong>Location:</strong>{" "}
          {report.location || "-"}
        </p>


        <p>
          <strong>Extracted Report:</strong>
        </p>


       <div className="report-text">

{report.extracted_text
  ? report.extracted_text
  : "No extracted text available"
}

</div>


        <button onClick={closeModal}>
          Close
        </button>


      </div>

    </div>

  );

}

export default ReportsModal;