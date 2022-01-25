import { render, screen } from "@testing-library/react";
import Questions from "./Questions";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { userLoginReducer } from "../../store/reducers/userReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export function createTestStore(
  answer1: number | null,
  answer2: number | null,
  answer3: number | null
) {
  const reducers = combineReducers({
    userLogin: userLoginReducer,
  });

  const userInfo = {
    question1: answer1,
    question2: answer2,
    question3: answer3,
  };

  const initialState = {
    userLogin: { userInfo },
  } as {};

  const middleware = [thunk];

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return store;
}

describe("Questions", () => {
  test("renders Question 1 if all three questions are null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(null, null, null)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question1 = screen.getByText(/Do you workout weekly?/i);
    expect(question1).toBeInTheDocument();
  });

  //question1 tests
  test("renders Question 1 if question 1 and 3 is null but question 2 is not", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(null, 1, null)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question1 = screen.getByText(/Do you workout weekly?/i);
    expect(question1).toBeInTheDocument();
  });

  test("renders Question 1 if question 1 and 2 is null but question 3 is not", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(null, null, 1)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question1 = screen.getByText(/Do you workout weekly?/i);
    expect(question1).toBeInTheDocument();
  });

  test("does not render question1 if question 1 is not null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, null, null)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question1 = screen.queryByText(/Do you workout weekly?/i);
    expect(question1).not.toBeInTheDocument();
  });

  //question2 tests
  test("renders Question 2 if question1 is not null question2 is null and question3 is null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, null, null)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question2 = screen.getByText(/Do you eat junk food?/i);
    expect(question2).toBeInTheDocument();
  });

  test("renders Question 2 if question1 is not null question2 is null and question3 is not null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, null, 1)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question2 = screen.getByText(/Do you eat junk food?/i);
    expect(question2).toBeInTheDocument();
  });

  test("does not render question2 if question 2 is not null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, 1, null)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question1 = screen.queryByText(/Do you eat junk food?/i);
    expect(question1).not.toBeInTheDocument();
  });

  //question3 tests
  test("renders Question 3 if question1 is not null question2 is not null and question3 is null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, 1, null)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question3 = screen.getByText(/Can you touch your toes?/i);
    expect(question3).toBeInTheDocument();
  });

  test("does not render question3 if question 3 is not null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, 1, 1)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const question1 = screen.queryByText(/Can you touch your toes?/i);
    expect(question1).not.toBeInTheDocument();
  });

  //userResults Tests
  test("renders user results if all 3 questions are not null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, 1, 1)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const firstName = screen.getByText(/First Name/i);
    const lastName = screen.getByText(/Last Name/i);
    const birthday = screen.getByText(/Birthday/i);
    const completionDate = screen.getByText(/Completion Date/i);
    const bodyAge = screen.getByText(/Body Age/i);
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(birthday).toBeInTheDocument();
    expect(completionDate).toBeInTheDocument();
    expect(bodyAge).toBeInTheDocument();
  });

  test("does not render user results if question 1 is null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(null, 1, 1)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const firstName = screen.queryByText(/First Name/i);
    const lastName = screen.queryByText(/Last Name/i);
    const birthday = screen.queryByText(/Birthday/i);
    const completionDate = screen.queryByText(/Completion Date/i);
    const bodyAge = screen.queryByText(/Body Age/i);
    expect(firstName).not.toBeInTheDocument();
    expect(lastName).not.toBeInTheDocument();
    expect(birthday).not.toBeInTheDocument();
    expect(completionDate).not.toBeInTheDocument();
    expect(bodyAge).not.toBeInTheDocument();
  });

  test("does not render user results if question 2 is null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, null, 1)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const firstName = screen.queryByText(/First Name/i);
    const lastName = screen.queryByText(/Last Name/i);
    const birthday = screen.queryByText(/Birthday/i);
    const completionDate = screen.queryByText(/Completion Date/i);
    const bodyAge = screen.queryByText(/Body Age/i);
    expect(firstName).not.toBeInTheDocument();
    expect(lastName).not.toBeInTheDocument();
    expect(birthday).not.toBeInTheDocument();
    expect(completionDate).not.toBeInTheDocument();
    expect(bodyAge).not.toBeInTheDocument();
  });

  test("does not render user results if question 3 is null", () => {
    window.fetch = jest.fn();
    render(
      <Provider store={createTestStore(1, 1, null)}>
        <BrowserRouter>
          <Questions />
        </BrowserRouter>
      </Provider>
    );

    const firstName = screen.queryByText(/First Name/i);
    const lastName = screen.queryByText(/Last Name/i);
    const birthday = screen.queryByText(/Birthday/i);
    const completionDate = screen.queryByText(/Completion Date/i);
    const bodyAge = screen.queryByText(/Body Age/i);
    expect(firstName).not.toBeInTheDocument();
    expect(lastName).not.toBeInTheDocument();
    expect(birthday).not.toBeInTheDocument();
    expect(completionDate).not.toBeInTheDocument();
    expect(bodyAge).not.toBeInTheDocument();
  });
});
