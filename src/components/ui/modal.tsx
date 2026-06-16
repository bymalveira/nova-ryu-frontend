export function Modal({ isOpen, onClose, title, children }: any) {
  if (!isOpen) return null;

  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 font-bold cursor-pointer">X</button>
        </div>
        {children}
      </div>
    </div>
  );
};
