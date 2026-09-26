"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { CheckCircle2, Info, X } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  variant: "success" | "info";
}

interface ToastContextValue {
  showToast: (message: string, variant?: "success" | "info") => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const showToast = useCallback(
    (message: string, variant: "success" | "info" = "success") => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, variant }]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast toast-top toast-end z-[100] mt-16 w-[min(90vw,340px)]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`animate-toast-in alert alert-soft w-full items-start border border-base-300 bg-base-200 shadow-lg shadow-black/40 ${
              toast.variant === "success" ? "alert-success" : "alert-info"
            }`}
          >
            {toast.variant === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            ) : (
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            )}
            <p className="flex-1 text-sm text-base-content">
              {toast.message}
            </p>
            <button
              aria-label="Dismiss"
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="text-base-content/60 hover:text-base-content"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
