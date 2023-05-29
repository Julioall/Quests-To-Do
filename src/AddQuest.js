function AddQuest() {
  return (
    <div className="flex gap-4 w-full justify-center items-center">
      <input
        placeholder="quest"
        className="rounded-full bg-secundary pl-2 input-sm flex w-[70%] focus:outline-none"
      />
      <button className="flex items-center text-center rounded-full bg-primary h-fit px-2 text-lg transform ease-out duration-300">
        +
      </button>
    </div>
  );
}

export default AddQuest;
