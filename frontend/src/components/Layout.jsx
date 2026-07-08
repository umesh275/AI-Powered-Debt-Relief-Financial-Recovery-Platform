import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (

        <>

            <Sidebar />

            <div
                className="layout-content"
                style={{
                    marginLeft: "260px",
                    minHeight: "100vh",
                    transition: "margin-left .3s ease"
                }}
            >

                {children}

            </div>

        </>

    );

}

export default Layout;