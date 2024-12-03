import Sidebar from "@/components/shared/Sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1">
      {children}
      </div>
    </main>
  );
}
