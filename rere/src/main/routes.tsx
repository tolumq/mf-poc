import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Button from "./Button";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <><Button type="button" text="Hello Button" /></>,
    },
]);
