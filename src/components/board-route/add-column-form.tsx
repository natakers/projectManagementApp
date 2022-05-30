import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addColumn } from '../../store/columns/colSlice';
import {
  useAppDispatch,
} from '../../store/store';
import BoardButton, { themes } from '../main-route/boardButton';

interface IFormValues {
  columnTitle: string;
}
const AddColumnForm: React.FC<{ setIsPopupDisplay: Function }> = ({
  setIsPopupDisplay,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const dispatch = useAppDispatch();
  const boardId = localStorage.getItem('boardId');
  const onSubmit: SubmitHandler<IFormValues> = (data: {
    columnTitle: string;
  }) => { if (boardId) {
    console.log('data', data);
    dispatch(
      addColumn({
        title: data.columnTitle,
        boardId: boardId,
      })
    );
    setIsPopupDisplay(false);
  }
  };

  return (
    <aside className="absolute top-0 left-0 z-10 bg-slate-700 h-28 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="columnTitle">
          <input
            className="bg-gray-800 border-2 rounded-sm"
            placeholder="New column"
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
      <BoardButton
        themes={themes.light}
        text="Close"
        onClick={() => setIsPopupDisplay(false)}
      />
    </aside>
  );
};

export default AddColumnForm;
