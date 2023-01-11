import Footer from "../components/Footer";
import Header from "../components/Header";
import MojeDonacije from "../components/MojeDonacije";
import HomeCSS from "../style/pages/Home.module.css";
import { ToastContainer } from "react-toastify";

function Base() {
  return (
    <>
      <div className={HomeCSS.wrapper}>
        <Header />
        <MojeDonacije />
        <Footer name={"footerExpand"} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />{" "}
      </div>
    </>
  );
}
export default Base;
