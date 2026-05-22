"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CustomerSidebarProps {
  children: React.ReactNode;
}  

export default function AdminSidebar({ children }: CustomerSidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
     { href: "/admin/barang", label: "Barang" },
    { href: "/admin/transactions", label: "Transaksi" },
    { href: "/admin/profile", label: "History Transaksi" },
    { href: "/admin/kelola-barang", label: "Kelola Barang" },
    { href: "/admin/logout", label: "Logout" },
  ];
   
  return (
    <div className="md:flex block min-h-screen bg-[#2f4f4f]">
      
      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between 
      bg-[#2f4f4f] text-white p-4 shadow-lg">

        {/* 🔥 LOGO ONLY */}
        <img src="/logo.png" alt="logo" className="w-300 h-300 object-contain mx-auto" />

        <button 
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-[#2f4f4f]/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full w-64
          bg-[#f4ecd8] border-r-4 border-[#d6c3a3]
          text-gray-800 shadow-xl
          transform transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* 🔥 HEADER LOGO ONLY */}
        <div className="p-6 border-b border-[#d6c3a3] flex justify-center">
          <img 
            src="/logo.png" 
            alt="Meja Rasa Logo" 
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* Menu */}
        <nav className="p-4 mt-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            if (item.label === "Logout") {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    block py-3 px-4 mb-2 rounded-xl
                    transition-all duration-200 font-medium
                    ${isActive 
                      ? 'bg-red-600 text-white' 
                      : 'text-red-600 hover:bg-red-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  block py-3 px-4 mb-2 rounded-xl
                  transition-all duration-200 font-medium
                  ${isActive 
                    ? 'bg-[#2f4f4f] text-white' 
                    : 'text-[#2f4f4f] hover:bg-[#e8f3f1]'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-[#d6c3a3]">
          <p className="text-sm font-semibold text-[#2f4f4f]">User</p>
          <p className="text-xs text-[#5d9696]">user@email.com</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[calc(100vh-3rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}