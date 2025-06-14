import { useState } from "react";

export default function QuestItem(props) {
  // recebe e define o título da missão
  const [title, setTitle] = useState(props.quest.title);
  // recebe e define se a missão foi concluída
  const [checked, setChecked] = useState(false);
  // chama o estado de edição da missão no componente
  const [editMode, setEditMode] = useState(false);
  // define o visual da missão na lista
  const concluded = props.quest.status === "concluído";

  return (
    <div
      className="flex gap-4 flex-col md:flex-row items-center"
      // id para teste do componente
      data-testid="questItem"
    >
      <div className="flex gap-4 items-center w-full sm:w-[80%]">
        <input
          disabled={concluded}
          type="checkbox"
          checked={checked}
          className="checkbox rounded-full border"
          onChange={() => {
            if (concluded) return;
            else {
              setChecked(!checked);
              props.saveConcludedQuest(props.quest);
            }
          }}
        />

        {editMode && !concluded ? (
          <input
            placeholder="quest"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-full bg-secundary pl-2 w-full input-sm flex focus:outline-none"
            // id para teste do input
            data-testid="input"
          />
        ) : (
          <p
            className={`break-words ${concluded ? "line-through" : ""}`}
            // id para teste do parágrafo
            data-testid="title"
          >
            {props.quest.title}
          </p>
        )}
      </div>
      {!concluded && (
        <div
          className="flex gap-4 w-full sm:w-fit justify-center"
          // id da div de edição
          data-testid="buttons"
        >
          <button
            // id do botão de edição
            data-testid="editButton"
            onClick={() => {
              if (editMode) props.saveEditQuest(props.quest, title);
              setEditMode(!editMode);
            }}
          >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
            </svg>

          </button>
          <button
            onClick={() => {
              if (concluded) return;
              else props.saveDeleteQuest(props.quest);
            }}
          >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>

          </button>
        </div>
      )}
    </div>
  );
}
