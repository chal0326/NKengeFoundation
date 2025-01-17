import { useToast } from './use-toast';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'flex items-center justify-between gap-4 rounded-lg p-4 shadow-lg',
            toast.variant === 'destructive'
              ? 'bg-red-600 text-white'
              : 'bg-white text-gray-900 dark:bg-gray-800 dark:text-white'
          )}
        >
          <div>
            <div className="font-semibold">{toast.title}</div>
            {toast.description && (
              <div className="mt-1 text-sm opacity-90">{toast.description}</div>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className="text-current opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
