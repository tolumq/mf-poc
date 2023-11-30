export enum Live {
    Human, Goat, Others
}

export type ButtonProps = {
    text: string;
    type: "button" | "submit" | "reset"
}

export enum Status { Rest = "rest", Loading = "loading", Error = "error", Success="success" };
