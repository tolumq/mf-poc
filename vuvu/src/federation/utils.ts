import { ButtonProps, InputProps } from "shared"


// export const SharedComponents = {
//     Button: "button",
//     Input: "input",
// } as const;

// export type SharedModules = (typeof SharedComponents)[keyof typeof SharedComponents];

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
        url: "http://localhost:8081/RemoteEntry.js",
        scope: ModuleScope.Home,
        module: "./Button"
    },
    [SharedComponents.Input]: {
        url: "http://localhost:8081/RemoteEntry.js",
        scope: ModuleScope.Home,
        module: "./Button"
    }
} as const;


// export const sharedComponents = {'button': "button", "input": "input"};


// export interface SharedProps {
//     [SharedComponents.Button]: ButtonProps
//     [SharedComponents.Input]: InputProps
// }

// type days = {message: string};


