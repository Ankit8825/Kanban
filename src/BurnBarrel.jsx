/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { useDeleteTaskMutation } from "./store/service";
const BurnBarrel = ({ setCards }) => {
    const [active, setActive] = useState(false);
    const [deleteTask]= useDeleteTaskMutation();
  
    const handleDragOver = (e) => {
      e.preventDefault();
      setActive(true);
    };
  
    const handleDragLeave = () => {
      setActive(false);
    };
  
    const handleDragEnd = async (e) => {
      const cardId = e.dataTransfer.getData("cardId");
  
      // setCards((pv) => pv.filter((c) => c.id !== cardId));
      try {
        // Call the delete API
        await deleteTask(cardId).unwrap();
  
        // If successful, update the frontend state
        setCards((prev) => prev.filter((card) => card.id !== cardId));
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
  
      setActive(false);
    };
  
    return (
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
          active
            ? "border-red-800 bg-red-800/20 text-red-500"
            : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`}
      >
        {active ? <FaFire className="animate-bounce" /> : <FiTrash className="hover:animate-bounce"/>}
      </div>
    );
  };

  export default BurnBarrel;