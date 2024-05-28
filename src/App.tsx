import { useEffect, useState } from 'react'
import './App.css'
import {ToDoItem, getAllLists} from './services/todo-services'



function App() {
   const [lists, setLists] = useState<any[]>([]); 

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getAllLists();
        setLists(data); 
      } catch (e) {
        console.warn(e);
      }
    };

    fetchLists(); 
  }, []);

  return (
      <>
      <div>
        <h2>To-Do Lists</h2>
        <div>
          {lists.map(list => (
            <div key={list.id}>
              <h3>{list.title}</h3>
              <div>
                {list.items.map((item: ToDoItem) => (
                  <li key={item.id}>
                    {item.name}: {item.description} (Due: {item.dueDate})
                  </li>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
