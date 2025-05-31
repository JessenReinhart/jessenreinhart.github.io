import Footer from "../components/Footer";
import MatrixBackground from "../components/MatrixBackground";
import Navigation from "../components/Navigation";
import ScrollIndicator from "../components/ScrollIndicator";

const Layout = (props) => (
    <>
        <MatrixBackground />
        <ScrollIndicator />
        <Navigation />
        <main>
            {props.children}
        </main>
        <Footer />
    </>
);

export default Layout;