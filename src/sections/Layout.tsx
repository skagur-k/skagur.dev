import Header from "./Header";
import type { NextPage } from "next";

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <Header />
            <div className="max-w-6xl w-full flex item-center mx-auto justify-center h-screen ">
                {children}
            </div>
        </>
    );
};

export default Layout;
