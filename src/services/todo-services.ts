export interface ToDoItem {
  id: number;
  name: string;
  description: string;
  dueDate: string;
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