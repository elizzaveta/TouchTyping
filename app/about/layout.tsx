import React from "react";
export const metadata = {
    title: 'Typer | About',
    description: 'About page of Typer project',
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