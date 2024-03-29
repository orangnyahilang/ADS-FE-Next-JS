// src/components/TaskCard.js

import { useTasks } from "../context/TasksContext";
import { useRouter } from "next/navigation";
import { VscTrash } from "react-icons/vsc";
import { VscEdit } from "react-icons/vsc";
import { toast } from "react-hot-toast";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faClock, faBarsProgress } from '@fortawesome/free-solid-svg-icons';


export const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const router = useRouter();

  // Menggunakan fungsi format untuk mengonversi objek Date ke dalam string
  const formatDeadline = (deadline) => {
    return deadline.toLocaleString(); // Atau gunakan metode format date yang sesuai dengan kebutuhan Anda
  };

  return (
    <div className="bg-gray-700 hover:bg-gray-600 cursor-pointer m-2 p-4 mb-4 w-[80vw] rounded-lg">
      <div className="flex justify-between items-center">
        <div className="w-[50vw]">
          <div className="flex justify-between">
            <h1 className="font-semibold mb-1 text-3xl max-sm:text-2xl">{task.title}</h1>
            {/* Tombol Delete dipindahkan ke samping */}
          </div>
          <p className="text-gray-300 mb-2 max-sm:w-[90%] overflow-hidden overflow-ellipsis max-h-[3em] max-sm:max-h-[3em]">{task.description}</p>
          <span className="text-gray-400 text-xs block mb-1"><FontAwesomeIcon icon={faUserPen} /> Penulis: {task.author}</span>
          <span className="text-gray-400 text-xs block mb-1"><FontAwesomeIcon icon={faClock} /> Deadline: {formatDeadline(task.deadline)}</span>
          <span className="text-gray-400 text-xs block mb-1"><FontAwesomeIcon icon={faBarsProgress} /> Mata Kuliah: {task.matkul}</span>
        </div>
          
        <div className="flex items-center">

        <div className="max-sm:relative max-sm:left-[25%] mr-10 w-[0.2rem] h-[8rem] bg-gray-900 rounded-xl overflow-hidden max-sm:mr-1 max-sm:h-[4rem]">
        </div>
        <div className="m">
        </div>
        
        <div className="flex flex-col max-sm:scale-[70%] max-sm:relative max-sm:left-6">
        <button
          className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center mr-2 mb-3 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            const accept = confirm(
              "Are you sure you want to delete this task?"
            );
            if (accept) {
              deleteTask(task.id);
              toast.success("Task deleted successfully");
            }
          }}
        >
          <VscTrash className="mr-2" /> Hapus
        </button>

          <button
            className="bg-blue-500 hover:bg-blue-400 px-3 py-1 inline-flex items-center mr-2 rounded-md"
            onClick={() => router.push(`/edit/${task.id}`)}
          >
            <VscEdit className="mr-2" /> Update
          </button>
          </div>
        </div>
      </div>
      {/* Di sini Anda dapat menambahkan elemen tambahan sesuai kebutuhan */}
    </div>
  );
};