import { useCallback } from "react";



const TextInput = ({label,placeholder,className, onChange, type}) => { 
   const handleInputChange = useCallback((e)=>{onChange(e.target.value)},[onChange])
    return (
  <div className={className}>
    <label
      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
      htmlFor="grid-password"
    >
      {label}
    </label>
    <input
      onChange={handleInputChange}
      type={type}
      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      placeholder={placeholder}
    />
  </div>
    )
};


export default TextInput