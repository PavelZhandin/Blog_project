declare type Optional<T> = T | undefined;

// declaration.d.ts
declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}
