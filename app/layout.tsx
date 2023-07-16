import './globals.css'
import Navbar from "@/app/navbar";
import React from "react";
import {store} from "@/redux/store";
import {Provider} from "react-redux";

export const metadata = {
    title: 'Typer',
    description: 'Home page of Typer project',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        {/*<Provider store={store}>*/}
            <Navbar/>
            {children}
        {/*</Provider>*/}
        </body>

        </html>
    )
}
