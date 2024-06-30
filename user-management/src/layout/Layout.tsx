import Header from "../component/Header.tsx";
import Footer from "../component/Footer.tsx";
import {Outlet} from "react-router-dom";

export const Layout = ()=>{
    return(
        <>
            <div className="flex flex-col min-h-screen w-full">
                <Header/>
                <main className="flex flex-grow ">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>
    )
}