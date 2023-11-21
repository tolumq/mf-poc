import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./main/routes";

const app = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

app.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
