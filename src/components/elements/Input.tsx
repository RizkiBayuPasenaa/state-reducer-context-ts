interface InputProps { 
  type: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: InputProps) {
  const {type, placeholder, name, value, onChange} = props;
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      name={name} 
      value={value} 
      onChange={onChange}
    />
  )
}

export default Input;