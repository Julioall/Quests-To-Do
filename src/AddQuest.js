import { useState } from "react";

function AddQuest(props) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    props.saveAddQuest(title);
    setTitle("");
  };

  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <input
        placeholder="quest"
        className="rounded-full bg-secundary pl-2 input-sm flex w-[70%] focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="flex items-center text-center rounded-full bg-primary h-fit px-2 text-lg transform ease-out duration-300"
        onClick={handleAdd}
      >
        +
      </button>
    </div>
  );
}

export default AddQuest;
