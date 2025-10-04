'use client';

interface ErrorStateProps {
  title: string;
  message: string;
  showRetry?: boolean;
}

export function ErrorState({ title, message, showRetry = true }: ErrorStateProps) {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {showRetry && (
          <button 
            onClick={handleRetry} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
