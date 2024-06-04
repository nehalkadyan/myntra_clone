import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Importing Provider from react-redux for Redux store integration
import { Provider } from "react-redux";
// Importing the Redux store and persistor
import { store, persistor } from "./redux/store";

// Importing PersistGate for Redux persist integration
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Wrapping the entire application inside React.StrictMode for additional development mode checks */}

    <Provider store={store}>
      {/* Providing the Redux store to the application */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
