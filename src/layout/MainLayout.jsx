import Header from "../components/Header/Header.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Footer from "../components/Footer/Footer.jsx";

function MainLayout({ children }) {
  return (
    <div className="app-wrapper d-flex flex-column vh-100">
      <Header />

      <div className="d-flex flex-grow-1">
        <Sidebar />

        <main className="content p-4 flex-grow-1 bg-light">
          {children}
           <Footer />
        </main>
      </div>

     
    </div>
  );
}

export default MainLayout;
