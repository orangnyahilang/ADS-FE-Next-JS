// src/app/new/page.js

"use client";
import { useEffect } from "react";
import { useTasks } from "../../context/TasksContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskFormPage = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();
  const { createTask, updateTask, tasks } = useTasks();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    if (!params.id) {
      createTask(data.title, data.description, data.deadline, data.author, data.matkul);
      toast.success("Task created successfully");
    } else {
      updateTask(params.id, data);
      toast.success("Task updated successfully");
    }
    router.push("/");
  });

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
        setValue("deadline", taskFound.deadline ? new Date(taskFound.deadline) : null);
        setValue("author", taskFound.author);
        setValue("matkul", taskFound.matkul);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <form className="bg-gray-700 p-5 w-[70%] rounded-xl my-5" onSubmit={onSubmit}>
        <h1 className="text-3xl mb-3 font-semibold text-center">
          {params.id ? "Edit Tugas" : "Tugas Baru"}
        </h1>
        <label htmlFor="author" className="block text-gray-400 text-sm font-bold mb-2">
            Judul
          </label>
        <input
          type="text"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block rounded-xl"
          placeholder="Write a title"
          autoFocus
          name="title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="block text-red-400 mb-2">
            Bagian ini harus diisi
          </span>
        )}
          <label htmlFor="author" className="block text-gray-400 text-sm font-bold mb-2">
            Deskripsi
          </label>
        <textarea
          cols="2"
          placeholder="Write a Description"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-1 block rounded-xl"
          name="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="block text-red-400 mb-2">
            Bagian ini harus diisi
          </span>
        )}

        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-400 text-sm font-bold mb-2">
            Deadline
          </label>
          <DatePicker
            id="deadline"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block rounded-xl"
            selected={watch("deadline")}
            onChange={(date) => setValue("deadline", date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="Select deadline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-400 text-sm font-bold mb-2">
            Penulis
          </label>
          <input
            type="text"
            id="author"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block rounded-xl"
            placeholder="Enter author name"
            {...register("author", { required: true })}
          />
          {errors.author && (
            <span className="block text-red-400 mb-2">
              Bagian ini harus diisi
            </span>
          )}
        </div>

        <div className="mb-4">
        <label htmlFor="author" className="block text-gray-400 text-sm font-bold mb-2">
            Matkul
          </label>
        <input
          type="text"
          className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block rounded-xl"
          placeholder="Write a matkul"
          autoFocus
          name="matkul"
          {...register("matkul", { required: true })}
        />
        {errors.matkul && (
          <span className="block text-red-400 mb-2">
            Bagian ini harus diisi
          </span>
        )}
        </div>

        <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-md disabled:opacity-30">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TaskFormPage;