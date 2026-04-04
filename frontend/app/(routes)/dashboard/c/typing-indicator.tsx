export function AITypingBubble() {
  return (
    <div className="flex items-start gap-3">
      {/* Bubble */}
      <div className="px-4 py-2 rounded-2xl flex items-center">
        <div className="flex space-x-1">
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
