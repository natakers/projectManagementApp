export interface BoardProps {
  id?: string,
  title: string,
  description: string,
}

export interface ButtonProps {
  text: string, 
  type?: "reset" | "button" | "submit" | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined,
  themes: string | undefined
}

export interface ModalProps {
  boardId: string, 
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined
}

export interface InputProps {
  value: string, 
  name: string,
  type: string,
  placeholder: string,
  id: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement> |  undefined
}