import Link from "next/link";
import { useState, useEffect } from "react";

export default function Custom404() {
  const [show, setShow] = useState(false);

  useEffect(() => setShow(true), []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "#f9f9f9",
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.95)",
        transition: "opacity 0.5s, transform 0.5s",
      }}
    >
      <img
        src="/default.jpg"
        alt="Default Image"
        style={{ width: "300px", marginBottom: "30px" }}
      />
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang kamu cari tidak ada.</p>
      <Link href="/">
        <a
          style={{
            padding: "12px 25px",
            background: "#0070f3",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#005bb5")}
          onMouseLeave={(e) => (e.target.style.background = "#0070f3")}
        >
          Kembali ke Beranda
        </a>
      </Link>
    </div>
  );
}
