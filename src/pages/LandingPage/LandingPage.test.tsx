import { render, screen, waitFor } from "@testing-library/react";
import LandingPage from "./LandingPage";
import {
  getAllLists,
  createNewList,
  addItemToList,
  ToDoList,
} from "../../services/todo-services";
import { vi } from "vitest";

vi.mock("../../services/todo-services");

const mockLists: ToDoList[] = [
  {
    id: 1,
    title: "Test List 1",
    items: [
      {
        id: 1,
        name: "Item A",
        description: "Description A",
        dueDate: new Date().toISOString(),
        done: false,
      },
      {
        id: 2,
        name: "Item B",
        description: "Description B",
        dueDate: new Date().toISOString(),
        done: true,
      },
    ],
    dateCreated: "",
  },
  {
    id: 2,
    title: "Test List 2",
    items: [],
    dateCreated: "",
  },
];

let uniqueId = 3;  

const setupMocks = () => {
  vi.clearAllMocks();
  vi.mocked(getAllLists).mockResolvedValue(mockLists);
  vi.mocked(createNewList).mockImplementation((title: string) =>
    Promise.resolve({
      id: uniqueId++,
      title,
      items: [],
      dateCreated: new Date().toISOString(),
    })
  );
  vi.mocked(addItemToList).mockImplementation((listId, item) =>
    Promise.resolve({
      ...item,
      id: uniqueId++,
      done: false,
    })
  );
};

const renderLandingPage = () => render(<LandingPage />);


describe("LandingPage Component", () => {
  beforeEach(setupMocks);

  test("renders lists and items correctly", async () => {
    renderLandingPage();

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes("Test List 1"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("Test List 2"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("Item A"))
      ).toBeInTheDocument();
      expect(
        screen.getByText((content) => content.includes("Item B"))
      ).toBeInTheDocument();
    });
  });


});
