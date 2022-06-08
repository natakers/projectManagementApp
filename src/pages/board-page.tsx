import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import BoardIcon from '../assets/icons/board.icon';
import AddColumnForm from '../components/board-route/add-column-form';
import Column from '../components/column';
import TaskWindow from '../components/task/taskWindow';
import {
  AppState,
  useAppDispatch,
  useAppSelector,
} from '../store/store';
import { getAllAboutBoard } from '../store/task/taskSlice';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DragStart,
  DropResult,
} from 'react-beautiful-dnd';
import {
  getColumnById,
  updateColumn,
} from '../store/columns/colSlice';
import BoardButton, {
  themes,
} from '../components/main-route/boardButton';
import ArrowBack from '../assets/icons/arrowBack';
import BoardArrowBack from '../assets/icons/board-arrow-back.icon';

const BoardPage = () => {
  const [cookie] = useCookies(['user']);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPopupDisplay, setIsPopupDisplay] = useState(false);
  const [isOpenTask, setIsOpenTask] = useState(false);

  const { boards } = useAppSelector(
    (state: AppState) => state.boards
  );
  const { colTasks } = useAppSelector(
    (state: AppState) => state.tasks
  );
  const { columnById, isSuccess: isSuccessUpdate } = useAppSelector(
    (state: AppState) => state.columns
  );

  const boardId = localStorage.getItem('boardId');
  const board = boards.find((el) => el.id === boardId);
  if (board) {
    console.log(board);
  }
  console.log(boardId);

  const handlerClick = () => {
    setIsOpenTask(!isOpenTask);
  };

  useEffect(() => {
    cookie.user === undefined && navigate('/');
    if (cookie.user && boardId) {
      dispatch(getAllAboutBoard(boardId));
    }
  }, [cookie.user, navigate, dispatch, boardId, isSuccessUpdate]);

  const handleDragStart = (result: DragStart) => {
    const { draggableId, type, source } = result;
    if (type === 'COLUMN') {
      dispatch(
        getColumnById({
          boardId: source.droppableId,
          id: draggableId,
        })
      );
      console.log(result);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === 'COLUMN' && columnById) {
      await dispatch(
        updateColumn({
          boardId: source.droppableId,
          id: draggableId,
          title: columnById.title,
          order: destination.index,
        })
      );
    }
    dispatch(getAllAboutBoard(source.droppableId));
    console.log(result);
  };

  return (
    <main className=" overflow-hidden bg-slate-800 h-[68vh] text-gray-300 items-start px-5 flex flex-col gap-5 relative  overflow-y-hidden">
      {!boardId ? (
        <Link
          to="/main"
          className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500 "
        >
          Go to Main Page
        </Link>
      ) : (
        <>
          <section className="flex gap-3 justify-between items-center w-full ">
            <div className="flex items-center">
              <BoardIcon />
              <h1 className="text-3xl">{board?.title}</h1>
            </div>
            <div className="flex justify-center items-center">
              <Link className="flex" to="/main">
                {/* <button > */}
                <BoardArrowBack /> Back
                {/* </button> */}
              </Link>
            </div>
          </section>
          <section className="flex gap-5 w-full h-full items-start">
            <DragDropContext
              onDragStart={(result) => handleDragStart(result)}
              onDragEnd={(result) => handleDragEnd(result)}
            >
              <Droppable
                droppableId={boardId}
                key={boardId}
                direction="horizontal"
                type="COLUMN"
              >
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex gap-5 h-full flex-wrap "
                    >
                      {colTasks.columns.length > 0 &&
                        colTasks.columns.map((col, index) => (
                          <Column
                            key={col.id}
                            id={col.id}
                            order={col.order}
                            title={col.title}
                            tasks={col.tasks}
                            taskClick={handlerClick}
                          />
                        ))}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
            <div className="relative">
              <>
                <button
                  onClick={() => setIsPopupDisplay(true)}
                  className="text-gray-400 relative"
                >
                  <FormattedMessage id="addColumn" />
                </button>
                {isPopupDisplay && (
                  <AddColumnForm
                    setIsPopupDisplay={setIsPopupDisplay}
                  />
                )}
              </>
            </div>
          </section>
          <TaskWindow
            isOpenTask={isOpenTask}
            taskClick={handlerClick}
          />
        </>
      )}
    </main>
  );
};

export default BoardPage;
