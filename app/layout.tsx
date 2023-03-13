import './globals.css'
import Navbar from "@/app/navbar";

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
      <Navbar/>
      {children}
      </body>
    </html>
  )
}
