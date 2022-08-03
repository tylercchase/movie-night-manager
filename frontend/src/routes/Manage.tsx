import { useEffect, useState } from "react";
// import Movie from "../shared/Movie";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import './Manage.css'

import Movie from '../models/movie';
import Group from '../models/group';

const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

export default function Manage() {
  const [itemsa, setItems] = useState(getItems(10));
  const [selected, setSelected] = useState(getItems(5, 10));

  const [nights, setNights] = useState([]);
  const [generalMovies, setGeneralMovies] = useState([])
  let id2List: any = {
    droppable: "items",
    droppable2: "selected",
  };
  let getList = (id: any) => (id2List[id] === "items" ? itemsa : selected);

  let onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items: any = reorder(
        getList(source.droppableId),
        result.source.index,
        result.destination.index
      );
      if (source.droppableId === "droppable2") {
        setSelected(items);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setItems(result.droppable);
      setSelected(result.droppable2);
    }
  };

  useEffect(()=> {
    let url = 'http://127.0.0.1:5000/api/group/gamers';
    fetch(url).then(res => res.json()).then(data => {
      console.log(data)
    })
  }, [])
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <details> <summary className="date">August 5th, 2022</summary>
          <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className="movie-row"
            >
              {itemsa.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        </details>
        <h3 style={{"margin": "15px"}}>
          Movies
        </h3>
        <Droppable droppableId="droppable2" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className="movie-row"
            >
              {selected.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
