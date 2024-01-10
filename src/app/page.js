"use client";

import { useTasks } from "../context/TasksContext";
import { VscTasklist } from "react-icons/vsc";
import { TaskCard } from "../components/TaskCard";
import { useRouter } from "next/navigation";
import Sort from "../components/Sort";

function Home() {
  const router = useRouter();
  const { tasks, sortTasks, setSortOrder } = useTasks();

  const handleSortByTitle = () => {
    sortTasks("title");
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleSortByDeadline = () => {
    sortTasks("deadline");
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex justify-center items-center">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center mt-5">
          <h2 className="text-2xl">Belum ada tugas, silahkan menambahkan tugas</h2>
          <VscTasklist size="8rem" />
        </div>
      ) : (
        <div className="w-7/10">

        <Sort/>

          {tasks.map((task, i) => (
            <TaskCard task={task} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
