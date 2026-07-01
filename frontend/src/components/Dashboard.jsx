function Dashboard({ reports }) {

  return (

    <>

      <h1>Dashboard</h1>

      <p>
        Welcome to the Inspection Report Management & Analysis System.
      </p>


      <div className="cards">


        <div className="card">

          <h2>
            📄 {reports.length}
          </h2>

          <p>
            Total Reports
          </p>

        </div>



        <div className="card">

          <h2>
            ⚠️ {
              reports.filter(
                (r) => r.severity === "High"
              ).length
            }
          </h2>

          <p>
            High Severity
          </p>

        </div>



        <div className="card">

          <h2>
            📍 {
              new Set(
                reports.map(
                  (r) => r.location
                )
              ).size
            }
          </h2>

          <p>
            Locations
          </p>

        </div>



        <div className="card">

          <h2>
            💾 {
              reports.length > 0
                ? "Online"
                : "Offline"
            }
          </h2>

          <p>
            Database
          </p>

        </div>


      </div>

    </>

  );

}


export default Dashboard;