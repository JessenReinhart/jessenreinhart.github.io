/// <reference types="vite/client" />

import { JSX } from 'solid-js';

declare module 'solid-js' {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}
