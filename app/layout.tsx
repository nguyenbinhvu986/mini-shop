import Navbar from "../components/Navbar/Navbar";
import { ShopProvider } from "../components/context/ShopContext";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <ShopProvider>
          <Navbar />
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
