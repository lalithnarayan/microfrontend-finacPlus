declare module '../mocks/server' {
    export const server: {
        listen: (options: { onUnhandledRequest: string }) => void;
        resetHandlers: () => void;
        close: () => void;
    };
} 