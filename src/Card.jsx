// import React, { useState } from 'react';
// import DropIndicator from "./DropIndicator";
// import { motion } from "framer-motion";
// import { FaEdit, FaSave } from "react-icons/fa";

// const Card = ({ title, id, column, handleDragStart, handleCardUpdate, due }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [cardData, setCardData] = useState({ title, due, column });

//   const handleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const status = (state) => {
//     let val;
//     switch(state) {
//       case 'backlog':
//         val = 'bg-red-300';
//         break;
//       case 'todo':
//         val = 'bg-yellow-700';
//         break;
//       case 'doing':
//         val = 'bg-blue-500';
//         break;
//       case 'done':
//         val = 'bg-green-600';
//         break;
//       default:
//         val = '';
//     }
//     return val;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCardData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     handleCardUpdate({ ...cardData, id }); // Save the updated card data
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <DropIndicator beforeId={id} column={column} />
//       <motion.div
//         layout
//         layoutId={id}
//         draggable="true"
//         onDragStart={(e) => handleDragStart(e, { ...cardData, id })}
//         className="w-full h-32 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
//       >
//         {isEditing ? (
//           <div className="flex flex-col gap-2">
//             <input
//               className="text-sm text-neutral-100 bg-neutral-800 border border-neutral-700 p-1"
//               name="title"
//               value={cardData.title}
//               onChange={handleChange}
//             />
//             <input
//               className="text-xs text-neutral-100 bg-neutral-800 border border-neutral-700 p-1 mt-2"
//               name="due"
//               value={cardData.due}
//               onChange={handleChange}
//             />
//             <FaSave onClick={handleSave} cursor='pointer'/>
//           </div>
//         ) : (
//           <div>
//             <div className="flex justify-between">
//               <p className="text-sm text-neutral-100">{cardData.title}</p>
//               <FaEdit onClick={handleEdit} cursor='pointer' />
//             </div>
//             <div className='flex '>
//               <select 
//                 name="column" 
//                 className={`${status(cardData.column)} w-min px-1 rounded-md`} 
//                 value={cardData.column} 
//                 onChange={handleChange}
                
//               >
//                 <option value="backlog">backlog</option>
//                 <option value="todo">todo</option>
//                 <option value="doing">doing</option>
//                 <option value="done">done</option>
//               </select>
//             </div>
//             <p className="text-xs mt-2">Due Date: {cardData.due}</p>
//           </div>
//         )}
//       </motion.div>
//     </>
//   );
// };

// export default Card;


import React, { useState } from 'react';
import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";
import { FaEdit, FaSave } from "react-icons/fa";
import { useUpdateTaskMutation } from "./store/service"; // Import the updateTask mutation

const Card = ({ title, id, column, handleDragStart, handleCardUpdate, due }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cardData, setCardData] = useState({ title, due, column });
  const [updateTask] = useUpdateTaskMutation(); // Hook to call the updateTask API

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const status = (state) => {
    let val;
    switch(state) {
      case 'backlog':
        val = 'bg-red-300';
        break;
      case 'todo':
        val = 'bg-yellow-700';
        break;
      case 'doing':
        val = 'bg-blue-500';
        break;
      case 'done':
        val = 'bg-green-600';
        break;
      default:
        val = '';
    }
    return val;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Update the backend with the updated card data
    updateTask({ id, column: cardData.column,title:cardData.title, due:cardData.due })
      .unwrap()
      .then(() => {
        handleCardUpdate({ ...cardData, id }); // Update the frontend state
        setIsEditing(false);
      })
      .catch((error) => console.error('Failed to update task:', error));
  };

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { ...cardData, id })}
        className="w-full h-32 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        {isEditing ? (
          <div className="flex flex-col gap-1">
            <input
              className="text-sm text-neutral-100 bg-neutral-800 border border-neutral-700 p-1"
              name="title"
              value={cardData.title}
              onChange={handleChange}
            />
            <input
              className="text-xs text-neutral-100 bg-neutral-800 border border-neutral-700 p-1 mt-0.5"
              name="due"
              value={cardData.due}
              onChange={handleChange}
            />
            <input
              className="text-xs text-neutral-100 bg-neutral-800 border border-neutral-700 p-1 mt-0.5"
              name="column"
              value={cardData.column}
              onChange={handleChange}
            />
            <FaSave onClick={handleSave} cursor='pointer'/>
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-100">{cardData.title}</p>
              <FaEdit onClick={handleEdit} cursor='pointer' />
            </div>
            <div className='flex'>
              <select 
                name="column" 
                className={`${status(cardData.column)} w-min px-1 rounded-md`} 
                value={cardData.column} 
                onChange={handleChange}
              >
                <option value="backlog">backlog</option>
                <option value="todo">todo</option>
                <option value="doing">doing</option>
                <option value="done">done</option>
              </select>
            </div>
            <p className="text-xs mt-2">Due Date: {cardData.due}</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Card;
