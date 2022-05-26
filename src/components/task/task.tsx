import { TaskShowProps } from "../interfaces"

const Task = ({title, description, order, done}: TaskShowProps) => {
  return (
    <div className="bg-sky-500 m-2 p-2 hover:bg-slate-600">
      <h2>Title: {title}</h2>
      <div>Description: {description}</div>
    </div>
    
  )
}

export default Task