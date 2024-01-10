// Sort.js

import { useState } from "react";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { useTasks } from "../context/TasksContext";

const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const { sortTasks, setSortOrder } = useTasks();

  const handleSort = (option) => {
    if (sortOption === option) {
      // Jika opsi yang sama diklik dua kali, ubah urutan penyortiran
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Jika opsi yang berbeda diklik, tetapkan opsi baru dan urutan ke "asc"
      setSortOption(option);
      setSortOrder("asc");
    }

    // Lakukan penyortiran berdasarkan opsi yang dipilih
    sortTasks(option);
    setIsOpen(false); // Tutup dropdown setelah memilih
  };

  const getSortIcon = (option) => {
    // Tampilkan ikon sesuai dengan opsi sort yang aktif
    return sortOption === option ? (
      setSortOrder("asc") ? (
        <AiOutlineSortAscending className="text-white ml-1" />
      ) : (
        <AiOutlineSortDescending className="text-white ml-1" />
      )
    ) : null;
  };

  return (
    <div className="flex justify-end">
      <button
        type="button"
        className="group bg-yellow-500 hover:bg-yellow-400 px-3 py-1 my-[0.4rem] text-gray font-medium rounded-lg inline-flex items-center transition-all duration-300 ease-in-out hover:ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        Sort {getSortIcon(sortOption)}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-[17%] mt-2 w-40 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => handleSort("title")}
              className="block px-4 py-2 text-white hover:bg-gray-600 w-full text-left"
            >
              Judul
            </button>
            <button
              onClick={() => handleSort("deadline")}
              className="block px-4 py-2 text-white hover:bg-gray-600 w-full text-left"
            >
              Deadline
            </button>
            <button
              onClick={() => handleSort("matkul")}
              className="block px-4 py-2 text-white hover:bg-gray-600 w-full text-left"
            >
              Mata Kuliah
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
