
// import DEFAULT_CARDS from "./data";
import Column from "./Column";
import BurnBarrel from "./BurnBarrel";
import { useEffect, useState } from "react";
import { useGetTasksQuery } from "./store/service";
import DEFAULT_CARDS from "./data";
const Board = () => {

    // const {data:tasks }=useGetTasksQuery();
    // const [cards, setCards] = useState(tasks);
    // console.log(tasks)
    // if(!tasks){
    //   return;
    // }else{
    //   setCards(tasks)
    // }

    const { data: tasks } = useGetTasksQuery();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (tasks) {
            setCards(tasks);
        }
    }, [tasks]);

    return (
      <div className="flex h-full w-full gap-3 overflow-scroll p-12">
        <Column
          title="Backlog"
          column="backlog"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In progress"
          column="doing"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
        />
        <BurnBarrel setCards={setCards} />
      </div>
    );
  };


  export default Board;