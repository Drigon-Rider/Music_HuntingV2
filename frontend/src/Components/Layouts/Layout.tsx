import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[85vh]">
                {children}
            </div>
            <Footer />
        </div>
    );
};