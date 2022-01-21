import { render, screen } from "@testing-library/react";
import AllResults from "./AllResults";
import { Provider } from "react-redux";
import store from "../../store/index";
import { BrowserRouter } from "react-router-dom";

test("renders login", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AllResults />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText(/First Name/i);
    expect(linkElement).toBeInTheDocument();
  });