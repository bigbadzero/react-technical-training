import { render, screen } from "@testing-library/react";
import AllResults from "./AllResults";
import { Provider } from "react-redux";
import store from "../../store/index";
import { BrowserRouter } from "react-router-dom";

describe('All Results Tests', () => {
    test("renders All Results Table", () => {
        render(
          <Provider store={store}>
            <BrowserRouter>
              <AllResults />
            </BrowserRouter>
          </Provider>
        );

        const firstName = screen.getByText(/First Name/i);
        const lastName = screen.getByText(/Last Name/i);
        const birthday = screen.getByText(/Birthday/i)
        const completionDate = screen.getByText(/Completion Date/i);
        const bodyAge = screen.getByText(/Body Age/i)
        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(birthday).toBeInTheDocument();
        expect(completionDate).toBeInTheDocument();
        expect(bodyAge).toBeInTheDocument();
      });
})

