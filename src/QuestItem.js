import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function QuestItem({
  quest,
  index,
  saveEditQuest,
  saveDeleteQuest,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(quest.title);

  function handleSave() {
    saveEditQuest(quest, editedTitle);
    setIsEditing(false);
  }

  return (
    <Draggable draggableId={quest.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex-1">
            {isEditing ? (
              <input
                className="border rounded px-2 py-1 w-full"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />
            ) : (
              <span>{quest.title}</span>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            {/* Botão editar / salvar */}
            <button
              className={`w-4 h-4 rounded-full hover:scale-110 transition ${
                isEditing ? "bg-green-500" : "bg-yellow-400"
              }`}
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              title={isEditing ? "Salvar" : "Editar"}
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </button>

            {/* Botão deletar */}
            <button
              className="w-8 h-8 rounded-full bg-red-500 hover:scale-110 transition"
              onClick={() => saveDeleteQuest(quest)}
              title="Excluir"
            >
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
