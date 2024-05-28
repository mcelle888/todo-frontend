export interface ToDoItem {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  done: boolean;  
}

export interface ToDoList {
  id: number;
  title: string;
  dateCreated: string;
  items: ToDoItem[];
}

const baseUrl = "http://localhost:8080";

export const getAllLists = async (): Promise<ToDoList[]> => {
  const response = await fetch(baseUrl + "/todo");
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
  return data;
};

export const createNewList = async (title: string): Promise<ToDoList> => {
  const response = await fetch(baseUrl + "/todo", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });
  if (!response.ok) {
    throw new Error('Failed to create new list');
  }
  const data = await response.json();
  return data;
};

export const deleteList = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/todo/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete list');
  }
};