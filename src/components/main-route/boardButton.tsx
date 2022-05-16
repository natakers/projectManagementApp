const BoardButton = ( (props: IButton) => {
  return (
    <button className="border-2 border-sky-400 rounded p-1 bg-gradient-to-r from-sky-500 to-indigo-500"  onClick={props.onClick}>{props.text}</button>
  )
})

export default BoardButton;

interface IButton {
  text: string, 
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined
}