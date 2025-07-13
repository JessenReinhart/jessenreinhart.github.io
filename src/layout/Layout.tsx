import { createSignal, createEffect } from "solid-js";
import Footer from "../components/Footer";
import MatrixBackground from "../components/MatrixBackground";
import Navigation from "../components/Navigation";
import ScrollIndicator from "../components/ScrollIndicator";
import { toast } from "../stores/toast";

const Layout = (props) => (
    <>
        <MatrixBackground />
        <ScrollIndicator />
        <Navigation />
        <main>
            {props.children}
        </main>
        <Footer />
        <Toast />
    </>
);

function Toast() {
    const [visible, setVisible] = createSignal(false);

    createEffect(() => {
        if (toast()) {
            setVisible(true);
            setTimeout(() => setVisible(false), (toast()?.duration ?? 3000) - 300); // fade out before removal
        }
    });

    const getIconClass = () => {
        switch (toast()?.type) {
            case "success":
                return "fa fa-check-circle";
            case "error":
                return "fa fa-times-circle";
            case "info":
            default:
                return "fa fa-info-circle";
        }
    };

    return (
        <div class="fixed bottom-4 right-4 z-50">
            {toast() && (
                <div
                    class={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-md text-white transform transition-all duration-300
            ${visible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            ${toast()?.type === "error"
                            ? "bg-red-600"
                            : toast()?.type === "success"
                                ? "bg-green-600"
                                : "bg-gray-800"
                        }`}
                >
                    <i class={`${getIconClass()} text-lg`} aria-hidden="true" />
                    <span class="text-sm">{toast()?.message}</span>
                </div>
            )}
        </div>
    );
}


export default Layout;