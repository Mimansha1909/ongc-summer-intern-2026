function Reports({
  reports,
  setSelectedReport,
  deleteReport
}) {

  return (

    <>

      <h1>
        Stored Reports
      </h1>


      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Inspection ID</th>

            <th>Severity</th>

            <th>Location</th>
<th>Action</th>

          </tr>

        </thead>


        <tbody>

          {
            reports.length > 0 ?

            (

              reports.map((report) => (

                <tr key={report.id}>

                  <td>
                    {report.id}
                  </td>


                  <td>
                    {report.inspection_id || "-"}
                  </td>


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


                  <td>
                    {report.location || "-"}
                  </td>
                  



<td className="action-cell">

  <button
    className="action-btn"
    onClick={() => setSelectedReport(report)}
  >
    👁 View
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteReport(report.id)}
  >
    🗑 Delete
  </button>



</td>


                </tr>

              ))

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

  );

}


export default Reports;