import Sidebar from "@/components/shared/Sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="w-full">
      {children}
      </div>
    </main>
  );
}
