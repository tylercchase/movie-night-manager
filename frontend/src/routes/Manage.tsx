import { useEffect, useState } from "react";
// import Movie from "../shared/Movie";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import './Manage.css'

import Movie from '../shared/Movie'


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
  const sourceClone = Array.from(source.movies ?? source);
  const destClone = Array.from(destination.movies ?? destination);
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

  const [nights, setNights]: any = useState([]);
  const [generalMovies, setGeneralMovies] = useState([])

  let findNight = (date: any) => nights.find((night: any) => night.date === date)
  let getList = (id: any) => (id === "generalMovies" ? generalMovies : findNight(id));
  useEffect(() => {
    let url = 'http://127.0.0.1:5000/api/group/gamers';
    let parsedNights = nights.map((night: any) => {
        let temp = Object.assign({}, night)
        temp.movies = temp.movies.map(
         (movie: any) => {
            let temp2 = Object.assign({}, movie);
            delete temp2.id;
            return temp2;
          }
        )

        return temp;
      }
    )
    let parsedGeneralMovies = generalMovies.map((movie: any) => {
      let temp = Object.assign({}, movie);
      delete temp.id;
      return temp;
    })
    let jsonStuff = 
    {
      'group-name': 'gamers',
      'movies': parsedGeneralMovies,
      'nights': parsedNights,
    }
      const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonStuff)
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(_data => {
            });
  }, [nights, generalMovies])

  let onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {

      if (source.droppableId === "generalMovies") {
        const items: any = reorder(
          generalMovies,
          result.source.index,
          result.destination.index
        );
        setGeneralMovies(items);
      } else if(source.droppableId) {
        
        let night = nights.findIndex((night: any) => {;return night.date === source.droppableId});
        let copy: any = Array.from(nights);
        const items: any = reorder(
          copy[night].movies,
          result.source.index,
          result.destination.index
        );
        copy[night].movies = items;
        setNights(copy);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      if(result.generalMovies) {
        setGeneralMovies(result.generalMovies);
      }

      for( let x of Object.keys(result)) {
        if(x !== 'generalMovies') {
          let night = nights.findIndex((night: any) => {;return night.date === x});
          let copy: any = Array.from(nights);
          copy[night].movies = result[x];
          setNights(copy);
        }
      }
    }
  };

  useEffect(()=> {
    let url = 'http://127.0.0.1:5000/api/group/gamers';
    fetch(url).then(res => res.json()).then((data) => {
      let index = 1;
      let generalStuff = data.movies.map((x: any) => {
        x.id = index;
        index = index + 1;
        return x;
      })
      let generalNights = data.nights.map((night: any) => {
        night.movies = night.movies.map((x: any) => {
          x.id = index;
          index = index + 1;
          return x;
        })
        return night
      })
      setGeneralMovies(generalStuff);
      setNights(generalNights);
    })
  }, [])
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
      { nights.map( (night: any, index: any) => 
      <details key={index}> <summary>{night.date}</summary>
      <Droppable droppableId={night.date} direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className="movie-row"
            >
              {night.movies.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.name} index={index}>
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
                      <Movie thing={item}></Movie>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </details>
        )}
        <h3 style={{"margin": "15px"}}>
          Movies
        </h3>
        <Droppable droppableId="generalMovies" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className="movie-row"
            >
              {generalMovies.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.name} index={index}>
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
                      <Movie thing={item}></Movie>
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
