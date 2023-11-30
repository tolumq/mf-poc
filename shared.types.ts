export type ButtonProps = {
    text: string;
    type: "button" | "submit" | "reset";
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    classes: string;
}

export enum ImageSize {
    Small, Medium, Large,
}

export type IconProps = {
    image: string;
    alt: string;
    classes: string;
    size?: ImageSize;
}

export type InputProps = {
    name: string;
    label?: string;
    classes: Record<Partial<"label"| "input" | "wrapper">, string>;
    inputType: React.HTMLInputTypeAttribute;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean
}


export enum Status { Rest = "rest", Loading = "loading", Error = "error", Success="success" };