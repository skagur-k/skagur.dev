import Header from "./Header";
import siteMetadata from "lib/siteMetaData";
import headerNavLinks from "lib/headerNavLinks";
import SectionContainer from "../SectionContainer";

const Layout = ({ children }) => {
    return (
        <SectionContainer>
            <Header />
            <main className="mb-auto mt-0 lg:mt-4">{children}</main>
        </SectionContainer>
    );
};

export default Layout;
