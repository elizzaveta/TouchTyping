import React from "react";
export const metadata = {
    title: 'Typer | Cheat Sheet',
    description: 'Cheat Sheet on Touch Typing',
}
export default function AboutLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    )
}