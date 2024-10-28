
interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
}
function Button(props : ButtonProps) {
  const { type, children, onClick } = props;
  return (
    <button type={type} onClick={onClick}>{children}</button>
  )
}

export default Button;