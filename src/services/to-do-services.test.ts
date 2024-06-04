import {
  getAllLists,
  createNewList,
  updateListTitle,
  deleteList,
  addItemToList,
  updateItemInList,
  deleteItemFromList,
  ToDoList,
  ToDoItem
} from "./todo-services"
import { vi} from "vitest";

const baseUrl = "http://localhost:8080";

global.fetch = vi.fn();

describe("ToDo Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("getAllLists should fetch all lists and their items", async () => {
    const mockResponse: ToDoList[] = [
      {
        id: 1,
        title: "Test List 1",
        dateCreated: "",
        items: [
          {
            id: 1,
            name: "Item A",
            description: "Description A",
            dueDate: new Date().toISOString(),
            done: false,
          },
        ],
      },
    ];

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getAllLists();
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(baseUrl + "/todo");
  });

  test("createNewList should create a new list", async () => {
    const mockResponse: ToDoList = {
      id: 2,
      title: "New List",
      dateCreated: new Date().toISOString(),
      items: [],
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createNewList("New List");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(baseUrl + "/todo", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "New List" }),
    });
  });

  test("updateListTitle should update the title of a list", async () => {
    const mockResponse: ToDoList = {
      id: 1,
      title: "Updated List",
      dateCreated: "",
      items: [],
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await updateListTitle(1, "Updated List");
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/todo/1`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: "Updated List" }),
    });
  });

  test("deleteList should delete a list", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
    });

    await deleteList(1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/todo/1`, { method: 'DELETE' });
  });

  test("addItemToList should add an item to a list", async () => {
    const mockResponse: ToDoItem = {
      id: 1,
      name: "New Item",
      description: "New Item Description",
      dueDate: new Date().toISOString(),
      done: false,
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await addItemToList(1, {
      name: "New Item",
      description: "New Item Description",
      dueDate: new Date().toISOString(),
    });
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/todo/1/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "New Item",
        description: "New Item Description",
        dueDate: new Date().toISOString(),
      }),
    });
  });

  test("updateItemInList should update an item in a list", async () => {
    const mockResponse: ToDoItem = {
      id: 1,
      name: "Updated Item",
      description: "Updated Description",
      dueDate: new Date().toISOString(),
      done: true,
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await updateItemInList(1, 1, {
      name: "Updated Item",
      description: "Updated Description",
      dueDate: new Date().toISOString(),
    });
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/todo/1/items/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: "Updated Item",
        description: "Updated Description",
        dueDate: new Date().toISOString(),
      }),
    });
  });

  test("deleteItemFromList should delete an item from a list", async () => {
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
    });

    await deleteItemFromList(1, 1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/todo/1/items/1`, { method: 'DELETE' });
  });
});
