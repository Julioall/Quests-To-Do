import QuestItem from "./QuestItem";

export default function QuestList({ quests, saveEditQuest, saveDeleteQuest }) {
  return (
    <>
      {quests.map((quest, index) => (
        <QuestItem 
          key={quest.id} 
          quest={quest} 
          index={index} 
          saveEditQuest={saveEditQuest}            
          saveDeleteQuest={saveDeleteQuest}
        />
      ))}
    </>
  );
}
