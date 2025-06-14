import { useState } from "react";
import AddQuest from "./AddQuest";
import QuestList from "./QuestList";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function App() {
  const localQuests = JSON.parse(window.localStorage.getItem("quests")) || [];
  const [quests, setQuests] = useState(localQuests);

  const statusMap = {
    aberto: "Abertas",
    fazendo: "Em Progresso",
    concluído: "Concluídas",
  };

  const groupedQuests = {
    aberto: quests.filter((q) => q.status === "aberto"),
    fazendo: quests.filter((q) => q.status === "fazendo"),
    concluído: quests.filter((q) => q.status === "concluído"),
  };

  function saveQuestList(newList) {
    localStorage.setItem("quests", JSON.stringify(newList));
    setQuests(newList);
  }

  function handleDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    const sourceQuests = [...groupedQuests[sourceStatus]];
    const [movedQuest] = sourceQuests.splice(source.index, 1);

    movedQuest.status = destStatus;

    const updatedQuests = quests.map((q) =>
      q.id === movedQuest.id ? movedQuest : q
    );

    saveQuestList(updatedQuests);
  }

  function saveAddQuest(title) {
    const id = quests.length ? quests[quests.length - 1].id + 1 : 1;
    const newQuest = {
      id,
      title,
      status: "aberto",
      created_at: new Date().toUTCString(),
    };
    const updated = [...quests, newQuest];
    saveQuestList(updated);
  }

  function saveEditQuest(questToEdit, newTitle) {
    const updatedQuests = quests.map((quest) =>
      quest.id === questToEdit.id ? { ...quest, title: newTitle } : quest
    );
    setQuests(updatedQuests);
    localStorage.setItem("quests", JSON.stringify(updatedQuests));
  }

  function saveDeleteQuest(questToDelete) {
    const filteredQuests = quests.filter(
      (quest) => quest.id !== questToDelete.id
    );
    setQuests(filteredQuests);
    localStorage.setItem("quests", JSON.stringify(filteredQuests));
  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-50">
      <div className="card w-[90%] h-[90%] shadow-md rounded-xl flex flex-col p-8 gap-6 bg-white">
        <h1 className="text-4xl font-bold text-center">Quests To Do</h1>
        <AddQuest saveAddQuest={saveAddQuest} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-row w-full h-full gap-4 overflow-hidden">
            {Object.entries(groupedQuests).map(([status, list]) => (
              <div
                key={status}
                className={`flex flex-col w-full h-full rounded-lg p-3 gap-2 ${
                  status === "aberto"
                    ? "bg-gray-100"
                    : status === "fazendo"
                    ? "bg-gray-200"
                    : "bg-gray-300"
                }`}
              >
                <h2 className="text-xl font-semibold text-center">
                  {statusMap[status]}
                </h2>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      className="flex flex-col gap-2 overflow-y-auto scrollbar-thin h-full"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <QuestList 
                        quests={list}
                        saveEditQuest={saveEditQuest}
                        saveDeleteQuest={saveDeleteQuest}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
