import { createSignal } from "solid-js";

type Toast = {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number; // in ms
};

const [toast, setToast] = createSignal<Toast | null>(null);

export function showToast(toastData: Toast) {
    setToast(toastData);
    setTimeout(() => setToast(null), toastData.duration ?? 3000);
}

export { toast };
