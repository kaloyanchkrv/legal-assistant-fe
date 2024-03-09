/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    // ...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module "*.svg" {
    import { type FC, SVGProps } from "react";

    export const ReactComponent: FC<SVGProps<SVGSVGElement> & { title?: string }>;
}

type Nullable<T> = T | null;
type MakeNullable<T, K extends keyof T | void = void> = {
    [P in keyof T]: P extends K ? T[P] : Nullable<T[P]>;
};
type ValueUnion<T> = T[keyof T];