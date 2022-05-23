export interface BoardProps {
  id?: string,
  title: string,
  description: string,
  toggleWindow?: () => void
}

export interface ButtonProps {
  text: string, 
  type?: "reset" | "button" | "submit" | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined,
  themes: string | undefined
}

export interface ModalProps {
  boardId: string, 
  onClick?: React.MouseEventHandler<HTMLButtonElement> |  undefined,
  toggleWindow: () => void
}

export interface InputProps {
  value: string, 
  name: string,
  type: string,
  placeholder: string,
  id: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement> |  undefined
}

export interface BoardCreationProps {
  toggleWindow: () => void
}

export interface TokenProps {
  iat: string,
  login: string,
  userId: string,
}