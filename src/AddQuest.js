import { useState, useRef, useEffect } from "react";

function AddQuest({ saveAddQuest }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  const handleSave = () => {
    if (!title.trim()) return;
    saveAddQuest(title.trim());
    setTitle("");
    setIsAdding(false);
  };

  const handleCancel = () => {
    setTitle("");
    setIsAdding(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <div className="flex items-center justify-end w-full gap-3">
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          aria-label="Adicionar nova quest"
          className="
            w-8 h-8 rounded-full bg-blue-500 hover:scale-110 transition
           hover:bg-blue-600 cursor-pointer
            transform ease-out duration-300 flex items-center justify-center
          "
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      )}

      {isAdding && (
        <div
          className={`
          flex items-center bg-white rounded-full shadow-sm w-full px-4 py-2 gap-3
          transform transition-all duration-300 ease-in-out
          ${
            isAdding
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Nova quest..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="
            flex-grow rounded-full border border-gray-300 px-4 py-2
            bg-gray-100
            text-gray-900 placeholder-gray-400 focus:outline-none
            focus:ring-2 focus:ring-gray-400 transition-shadow duration-300
          "
          />

          {/* Botão verde - salvar */}
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className={`
            w-4 h-4 rounded-full 
            ${
              title.trim()
                ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                : "bg-green-200 cursor-not-allowed"
            }
            transition transform ease-out duration-300
          `}
            aria-label="Salvar quest"
          ></button>

          {/* Botão vermelho - cancelar */}
          <button
            onClick={handleCancel}
            className="w-4 h-4 rounded-full bg-red-500 hover:scale-110 transition
            hover:bg-red-600 cursor-pointer
            transform ease-out duration-300
          "
            aria-label="Cancelar"
          ></button>
        </div>
      )}
    </div>
  );
}

export default AddQuest;
