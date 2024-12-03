"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { motion } from "motion/react";
import {
  ChevronsRight,
  Home,
  LucideIcon,
  CalendarCheck,
  LayoutList,
  User,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useUser } from "@/context/user.provider";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const userNavs = [
  { Icon: Home, title: "Dashboard", path: "/dashboard" },
  { Icon: CalendarCheck, title: "My Bookings", path: "/dashboard/bookings" },
];

const adminNavs = [
  { Icon: LayoutDashboard, title: "Dashboard", path: "/admin" },
  { Icon: CalendarCheck, title: "Bookings", path: "/dashboard/bookings" },
  { Icon: LayoutList, title: "Facilities", path: "/dashboard/facilities" },
  { Icon: Users, title: "Users", path: "/dashboard/users" },
];

export default function Sidebar() {
  const { user } = useUser();
  const [open, setOpen] = useState(true);
  const selected = usePathname();
  const userOptions = user?.role !== "ADMIN" ? userNavs : adminNavs;
  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        {userOptions.map((option) => (
          <Option
            key={option.title}
            Icon={option.Icon}
            title={option.title}
            path={option.path}
            selected={selected}
            open={open}
          />
        ))}
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
}

interface OptionProps {
  Icon: LucideIcon;
  title: string;
  path: string;
  selected: string;
  open: boolean;
  notifs?: number;
}

const Option = ({ Icon, title, path, selected, open, notifs }: OptionProps) => {
  return (
    <Link href={path}>
      <motion.button
        layout
        // onClick={}
        className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
          selected === path
            ? "bg-neutral-900 text-white"
            : "text-neutral-900 hover:bg-slate-100"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium font-popins"
          >
            {title}
          </motion.span>
        )}

        {notifs && open && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            style={{ y: "-50%" }}
            transition={{ delay: 0.5 }}
            className="absolute right-2 top-1/2 size-4 rounded bg-indigo-500 text-xs text-white"
          >
            {notifs}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

interface TitleSectionProps {
  open: boolean;
}

const TitleSection = ({ open }: TitleSectionProps) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center justify-center gap-2">
          <Logo open />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            ></motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = ({ open }: TitleSectionProps) => {
  return (
    <motion.div layout className="h-10 flex items-center">
      <Link href="/">
        <Image src={"/logo.svg"} alt="logo" width={40} height={30} />
      </Link>
    </motion.div>
  );
};

interface ToggleCloseProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ToggleClose = ({ open, setOpen }: ToggleCloseProps) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <ChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};
