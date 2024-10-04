import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import '@testing-library/jest-dom';

const mock = new MockAdapter(axios);

describe("App", () => {
  test("renders users after successful API request", async () => {
    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(200, [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ]);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("shows error message on API failure", async () => {
    mock.onGet("https://jsonplaceholder.typicode.com/users").reply(500);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
        expect(screen.getByText("Ошибка с стягиванием данных")).toBeInTheDocument();
    });      
  });
});