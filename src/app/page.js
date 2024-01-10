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

  const customCSS = `
  .loader {
    position: relative;
    width: 2.5em;
    height: 2.5em;
    transform: rotate(165deg);
   }
   
   .loader:before, .loader:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0.5em;
    height: 0.5em;
    border-radius: 0.25em;
    transform: translate(-50%, -50%);
   }
   
   .loader:before {
    animation: before8 2s infinite;
   }
   
   .loader:after {
    animation: after6 2s infinite;
   }
   
   @keyframes before8 {
    0% {
     width: 0.5em;
     box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
    }
   
    35% {
     width: 2.5em;
     box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
    }
   
    70% {
     width: 0.5em;
     box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
    }
   
    100% {
     box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
    }
   }
   
   @keyframes after6 {
    0% {
     height: 0.5em;
     box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
    }
   
    35% {
     height: 2.5em;
     box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
    }
   
    70% {
     height: 0.5em;
     box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
    }
   
    100% {
     box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
    }
   }
   
   .loader {
    position: absolute;
    top: calc(50% - 1.25em);
    left: calc(50% - 1.25em);
   }
  `;

  return (
    <div className="flex justify-center items-center">
      <style>{customCSS}</style>
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-5">
          <h2 className="text-2xl">Belum ada tugas, silahkan menambahkan tugas</h2>
          <VscTasklist size="8rem" />
        </div>
      ) : (
        <div className="w-7/10">

        <Sort/>

        <div className="relative right-[49%] scale-[110%] max-sm:right-[47%] max-sm:scale-[90%]">
        <div className='loader'></div>
        </div>
        
          {tasks.map((task, i) => (
            <TaskCard task={task} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
