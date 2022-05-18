const BoardButton = (props: IButton) => {
  return (
    <button className="whitespace-nowrap border-2 border-sky-400 rounded p-1 bg-sky-500 z-10 m-2   hover:bg-slate-600 "  onClick={props.onClick}>{props.text}</button>
  )
}

export default BoardButton;

interface IButton {
  text: string, 
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined
}