const Input = (props: IInput) => {

  return (
    <div className="form__item w-full">
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
        className="form__control inline-flex w-full items-center px-4 py-3 border border-solid border-slate-400 rounded-lg"
      />
    </div>
  )
}

export default Input;

interface IInput {
  value: string, 
  name: string,
  type: string,
  placeholder: string,
  id: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement> |  undefined
}