import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import store from "./api/store.ts";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
