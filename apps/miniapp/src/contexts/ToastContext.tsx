import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

export interface ShowToastOptions {
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (options: ShowToastOptions) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const MAX_TOASTS = 3;
const DEFAULT_DURATION = 3000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const queueRef = useRef<ShowToastOptions[]>([]);
  const processingRef = useRef(false);

  const processQueue = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0) return;

    setToasts((current) => {
      if (current.length >= MAX_TOASTS) return current;

      const nextItem = queueRef.current.shift();
      if (!nextItem) return current;

      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: Toast = {
        id,
        type: nextItem.type,
        message: nextItem.message,
        duration: nextItem.duration ?? DEFAULT_DURATION,
      };

      return [...current, newToast];
    });
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id));
    setTimeout(processQueue, 50);
  }, [processQueue]);

  const showToast = useCallback((options: ShowToastOptions) => {
    queueRef.current.push(options);
    processQueue();
  }, [processQueue]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
