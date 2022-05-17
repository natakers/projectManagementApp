import { useAppSelector } from "../store/store";

const BoardPage = () => {
  const id = useAppSelector(state => state.boards.currentId);
  console.log(id);
  
  return (
    <main className=" bg-slate-800 min-h-screen items-center text-gray-300 justify-center flex flex-col gap-5">
      <h1 className="text-3xl">Board Page Is Out There!</h1>
    </main>
  );
};

export default BoardPage;
