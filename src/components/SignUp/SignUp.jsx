import React, { useCallback, useState } from "react";
import TextInput from "../TextInput";
import {useDispatch, useSelector} from 'react-redux'
import {createUser} from '../../redux/auth/user'

const SignUp = () => {

  const [form, setForm] = useState({
    email: " ",
    name: " ",
    password: " ",
  });

  const dispatch = useDispatch()
  const error = useSelector((state)=> state.user.error)
  const user = useSelector(({user})=> user.user)
  console.log(user)


  const handleFormChange = useCallback((type)=>{ 
    return (value)=> setForm((prevState)=>({...prevState, [type]: value}))
  },[])

  const handleButtonClick = useCallback(()=> {
    dispatch(createUser(form));
  },[createUser,form])

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3"></div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>Sign up</small>
              </div>
              <form>
                <TextInput  onChange={handleFormChange('name')} label='name' placeholder='Name' type='text' className='relative w-full mb-3'/>
                <TextInput onChange={handleFormChange('email')} label='email' placeholder='Email' type='email' className='relative w-full mb-3'/>
                <TextInput onChange={handleFormChange('password')} label='password' placeholder='Password' type='password' className='relative w-full mb-3'/>
                <div className="text-center mt-6">
                  <button
                    onClick={handleButtonClick}
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button"
                  >
                    Create Account
                  </button>
                </div>
              </form>
              {error && <span>{error}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
//export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
