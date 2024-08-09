// /* eslint-disable react/prop-types */
// import { motion } from "framer-motion";
// import { useState } from "react";
// import { FiPlus } from "react-icons/fi"


// const AddCard = ({ column, setCards }) => {
//     const [text, setText] = useState("");
//     const [adding, setAdding] = useState(false);

  
//     const handleSubmit = (e) => {
//       e.preventDefault();
  
//       if (!text.trim().length) return;
  
//       const newCard = {
//         column,
//         title: text.trim(),
//         id: Math.random().toString(),
//       };
  
//       setCards((pv) => [...pv, newCard]);
  
//       setAdding(false);
//     };
  
//     return (
//       <>
//         {adding ? (
//           <motion.form layout onSubmit={handleSubmit}>
//             <textarea
//               onChange={(e) => setText(e.target.value)}
//               autoFocus
//               placeholder="Add new task..."
//               className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
//             />
//             <div className="mt-1.5 flex items-center justify-end gap-1.5">
//               <button
//                 onClick={() => setAdding(false)}
//                 className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
//               >
//                 Close
//               </button>
//               <button
//                 type="submit"
//                 className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
//               >
//                 <span>Add</span>
//                 <FiPlus />
//               </button>
//             </div>
//           </motion.form>
//         ) : (
//           <motion.button
//             layout
//             onClick={() => setAdding(true)}
//             className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
//           >
//             <span>Add card</span>
//             <FiPlus />
//           </motion.button>
//         )}
//       </>
//     );
//   };
//   export default AddCard;

/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useCreateTaskMutation } from "./store/service";

const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [date,setDate]=useState("");

  // Initialize the useCreateTaskMutation hook
  const [createTask, { isLoading, isError, isSuccess, error }] = useCreateTaskMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newTask = {
      column,
      title: text.trim(),
      task: text.trim(),
      due: date.trim(), 
      category: '', // Adjust as necessary
    };

    try {
      await createTask(newTask).unwrap(); // Use unwrap to handle the response directly
      setText("");
      setAdding(false);
    } catch (err) {
      console.error('Failed to create task:', err);
      // Optionally, handle the error state (e.g., show an error message to the user)
    }
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <div>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            value={text}
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <input type="text" onChange={(e) => setDate(e.target.value)} value={date} placeholder="Add due date" className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"/>
          </div>
          
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>{isLoading ? 'Adding...' : 'Add'}</span>
              <FiPlus />
            </button>
          </div>
          {isError && <div className="text-red-500">Failed to add task: {error.message}</div>}
          {isSuccess && <div className="text-green-500">Task added successfully!</div>}
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
