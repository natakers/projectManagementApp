import { ButtonProps } from "../interfaces";

export const themes = {
  light:
    'whitespace-nowrap flex p-1 bg-sky-500 z-10 m-2 hover:bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text',
  dark: 'form__button flex px-4 py-2 text-lg border-transparent rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200',
};

const BoardButton = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={props.themes}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default BoardButton;


