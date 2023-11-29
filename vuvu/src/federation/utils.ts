import { ButtonProps, InputProps } from "shared"

export enum SharedComponents {
    Button ="button",
    Input = "input",
};

type Shared = Record<SharedComponents, {url: string, scope: string, module: string}>;

export enum ModuleScope {
    Home = "home",
}

export const shared: Shared = {
    [SharedComponents.Button]: {
        url: "http://localhost:8081/remoteEntry.js",
        scope: ModuleScope.Home,
        module: "./Button"
    },
    [SharedComponents.Input]: {
        url: "http://localhost:8081/remoteEntry.js",
        scope: ModuleScope.Home,
        module: "./Button"
    }
} as const;
