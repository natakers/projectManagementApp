import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addColumn } from '../../store/columns/colSlice';
import {
  AppState,
  useAppDispatch, useAppSelector,
} from '../../store/store';

interface IFormValues {
  columnTitle: string;
}
const boardId = localStorage.getItem('boardId')
const AddColumnForm: React.FC<{ setIsPopupDisplay: Function }> = ({
  setIsPopupDisplay,
}) => {
  const { columns, newColumn }  = useAppSelector((state: AppState) => state.columns);
  const { colTasks }  = useAppSelector((state: AppState) => state.tasks);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormValues> = (data: { columnTitle: any; }) => {
    console.log('data', data);
    if (boardId) {
      dispatch(
        addColumn({
          title: data.columnTitle,
          boardId: boardId,
        })
      );
    }
    console.log(columns);
    console.log(colTasks.columns);
    console.log(newColumn);
    
    
  };

  return (
    <aside className="absolute top-0 left-0 z-10 bg-slate-700 h-28">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="columnTitle">
          <input
            type="text"
            {...register('columnTitle', {
              required: true,
              minLength: 3,
            })}
          />
          {errors.columnTitle && (
            <span className="text-red-400">
              👨🏻‍🏫 * hey, bro, you need to type something{' '}
            </span>
          )}
        </label>
      </form>
      <button onClick={() => setIsPopupDisplay(false)}>Close</button>
    </aside>
  );
};

export default AddColumnForm;
