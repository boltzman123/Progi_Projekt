import Footer from "../components/Footer";
import Header from "../components/Header";
import NeobjavljeneDonacije from "../components/NeobjavljeneDonacije";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Base() {
    return (
        <>
            <Header />
            <NeobjavljeneDonacije />
            <Footer name={"footerExpand" } />
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
