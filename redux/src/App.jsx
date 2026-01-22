import { Provider } from "react-redux";
import { store } from "./store/store";
import ExpenseTracker from "./components/ExpenseTracker";

export default function App() {
  return (
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );
}
