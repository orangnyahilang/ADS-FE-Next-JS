"use client";

import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineSchedule } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useTasks } from "../context/TasksContext";

export function Navbar() {
  const router = useRouter();
  const { tasks } = useTasks();

  return (
    <header className="flex items-center bg-gray-800 px-28 max-sm:px-4 py-3 w-[100%]">
      <Link href="/">
        <h1 className="flex items-center font-black font-bold max-sm:font-semibold text-[2rem] max-sm:text-[1.2rem] text-white ">
        <AiOutlineSchedule className="mr-3 max-sm:mr-2"/>
          Applikasi Tugas</h1>
      </Link>

      <span className="ml-4 max-sm:ml-2 text-gray-400 font-bold text-[1rem] max-sm:text-[0.6rem]">{tasks.length} tugas</span>

      <div className="flex-grow text-right">
        <button
          className="group bg-green-500 hover:bg-green-400 px-4 py-2 text-gray font-medium rounded-lg inline-flex items-center transition-all duration-300 ease-in-out hover:ease-in-out"
          onClick={() => router.push("/new")}
        >
          <AiOutlinePlus className="mr-2" />
          Tambahkan
        </button>
      </div>
    </header>
  );
}
