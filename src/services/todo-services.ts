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

// get all lists and their items
export const getAllLists = async (): Promise<ToDoList[]> => {
  const response = await fetch(baseUrl + "/todo");
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  const data = await response.json();
  return data;
};

// create a new list
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

// delete a list
export const deleteList = async (id: number): Promise<void> => {
  const response = await fetch(`${baseUrl}/todo/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete list');
  }
};

// add an item to a list
export const addItemToList = async (listId: number, data: {name: string, description: string, dueDate: string }): Promise<ToDoItem> => {
  const response = await fetch(`${baseUrl}/todo/${listId}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error('Failed to add item to list');
  }
  const item = await response.json();
  return item;
}

//edit an item in a list
export const updateItemInList = async (listId: number, itemId: number, data: { name: string; description: string; dueDate: string }): Promise<ToDoItem> => {
  const response = await fetch(`${baseUrl}/todo/${listId}/items/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to update item in list');
  }
  const item = await response.json();
  return item;
};