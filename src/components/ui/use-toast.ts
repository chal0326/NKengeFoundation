import { useState } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastState extends Toast {
  id: number;
}

let id = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  function toast(toast: Toast) {
    const newToast = { ...toast, id: id++ };
    setToasts(prev => [...prev, newToast]);

    // Remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 5000);
  }

  function dismiss(toastId: number) {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }

  return {
    toasts,
    toast,
    dismiss,
  };
} 