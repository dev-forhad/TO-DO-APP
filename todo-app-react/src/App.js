import { Flex, Heading, Text } from "@chakra-ui/react";
import Column from './Column';
import axios from "axios";
import {DragDropContext} from 'react-beautiful-dnd'
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState(initialData)

  const [quote, setQuote] = useState(null);

  useEffect(() => {
      const fetchQuote = async() => {
          const res = await axios.get("https://localhost:44392/weatherforecast");
          setQuote(res.data);
      };

      fetchQuote();
  }, []);


  const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    debugger;
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);
  
    const newColumn = {
      ...sourceCol,
      taskIds: newTaskIds,
    };
  
    return newColumn;
  };

  const onDragEnd = (result) =>{
    debugger;
    const {destination, source} = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // if the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different positoin
    debugger;
    //const sourceCol = quote.columns[source.droppableId];
    const sourceCol  = quote.columnsInfo.find(item => item.id === source.droppableId);
    const destinationCol  = quote.columnsInfo.find(item => item.id === destination.droppableId);

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    debugger;
    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };
    debugger;
    const sourceTarget = quote.columnsInfo.findIndex((obj) => obj.id === newStartCol.id);
    
    const destinationTarget = quote.columnsInfo.findIndex((obj) => obj.id === newEndCol.id);
    quote.columnsInfo[sourceTarget] = newStartCol;
    quote.columnsInfo[destinationTarget] = newEndCol;

    const newState = {
      ...quote,
    };
    setQuote(newState);

  }

  return (
<DragDropContext onDragEnd={onDragEnd}>
<Flex
        flexDir="column"
        bg="main-bg"
        minH="100vh"
        w="full"
        color="white-text"
        pb="2rem"
      >
        <Flex py="4rem" flexDir="column" align="center">
          <Heading fontSize="3xl" fontWeight={600}>
            React Beautiful Drag and Drop
          </Heading>
          <Text fontSize="20px" fontWeight={600} color="subtle-text">
            react-beautiful-dnd
          </Text>
        </Flex>
        <Flex justify="space-between" px="4rem">
          
        {quote?.columnsInfo?.map((columnData) => {
          debugger;
                const column = columnData;
                const tasks = column.taskIds.map((taskId,index) =>
                  quote.tasks[taskId-1]
                  
                );
    
                return <Column key={column.id} column={column} tasks={tasks} />;
          })}


          {/* {state.columns.map((columnData) => {
            
                const column = columnData;
                const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
    
                return <Column key={column.id} column={column} tasks={tasks} />;
          })} */}
          
        </Flex>


      </Flex>
</DragDropContext>
    
  );
}



const initialData = {
  tasks: {
    1: { id: 1, content: "Configure Next.js application" },
    2: { id: 2, content: "Configure Next.js and tailwind " },
    3: { id: 3, content: "Create sidebar navigation menu" },
    4: { id: 4, content: "Create page footer" },
    5: { id: 5, content: "Create page navigation menu" },
    6: { id: 6, content: "Create page layout" },
  },
  columns:[
    {
      id: "column-1",
      title: "TO-DO",
      taskIds: [1, 2, 3, 4, 5, 6],
    },
    {
      id: "column-2",
      title: "IN-PROGRESS",
      taskIds: [],
    },
   {
      id: "column-3",
      title: "COMPLETED",
      taskIds: [],
    },
  ]
    
  
  // Facilitate reordering of the columns
  //columnOrder: ["column-1", "column-2", "column-3"],
};

export default App;
