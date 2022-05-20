export const themes = {
  light: "whitespace-nowrap flex border-2 border-sky-400 rounded p-1 bg-sky-500 z-10 m-2 hover:bg-slate-600",
  dark: "form__button flex px-4 py-2 text-lg border-transparent rounded-md shadow-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
};

const BoardButton = (props: IButton) => {
  return (
    <button type={props.type} className={props.themes}  onClick={props.onClick}>{props.text}</button>
  )
}

export default BoardButton;

interface IButton {
  text: string, 
  type?: "reset" | "button" | "submit" | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined,
  themes: string | undefined
}