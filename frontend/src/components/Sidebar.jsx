function Sidebar({ page, setPage }) {

return (

<aside className="sidebar">

<h2>
Inspection Portal
</h2>

<button
    className={page === "dashboard" ? "active" : ""}
    onClick={() => setPage("dashboard")}
>
    🏠 Dashboard
</button>

<button
    className={page === "upload" ? "active" : ""}
    onClick={() => setPage("upload")}
>
    📤 Upload Report
</button>

<button
    className={page === "reports" ? "active" : ""}
    onClick={() => setPage("reports")}
>
    📄 Reports
</button>

<button
    className={page === "about" ? "active" : ""}
    onClick={() => setPage("about")}
>
    ℹ About
</button>


</aside>

);

}

export default Sidebar;