export type ButtonProps = {
    text: string;
    type: "button" | "submit" | "reset";
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    classes: string;
}

export enum Status { Rest = "rest", Loading = "loading", Error = "error", Success="success" };