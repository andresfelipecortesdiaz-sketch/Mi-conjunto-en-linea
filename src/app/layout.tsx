import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Mi Conjunto en Línea | Altos del Parque", description: "Gestión de paquetes, reservas y PQRS de Altos del Parque" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
