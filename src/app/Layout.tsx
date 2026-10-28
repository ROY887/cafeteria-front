import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  updatedAt?: string;
}

export default function Layout({ children, updatedAt }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header updatedAt={updatedAt} />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-3 text-center text-xs text-gray-400">
        食堂リアルタイム混雑可視化システム
      </footer>
    </div>
  );
}
