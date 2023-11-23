import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Button from "./main/Button";

const app = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

const router = createBrowserRouter([
    {
        path: "/",
        element: <><Button type="button" text="Hello Button" /></>,
    },
]);


app.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
