import Header from "./Header";
import Footer from "./Footer";
import SectionContainer from "../SectionContainer";

const Layout = ({ children }) => {
    return (
        <SectionContainer>
            <Header />
            <main className="mb-auto">{children}</main>
            {/* <Footer /> */}
        </SectionContainer>
    );
};

export default Layout;
