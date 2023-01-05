import Footer from "../components/Footer";
import Header from "../components/Header";
import MojeDonacije from "../components/MojeDonacije";
import { ToastContainer } from 'react-toastify';

function Base() {
    return (
        <>
            <Header />
            <MojeDonacije />
            <Footer />
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
      />
        </>
    );
}
export default Base;
