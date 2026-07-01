function Upload({
  file,
  setFile,
  uploadFile,
  result
}) {

  return (

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

            <strong>
              File :
            </strong>

            {" "}{result.filename}

          </p>



          <p>

            <strong>
              Status :
            </strong>

            {" "}{result.status}

          </p>


        </div>

      )}


    </>

  );

}


export default Upload;