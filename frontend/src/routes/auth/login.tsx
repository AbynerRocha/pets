import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FaLock, FaUser } from 'react-icons/fa6'
import { Input } from '../../components/input'
import type { FormFields } from '../../types/input'
import { loginUser } from '../../services/login'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [fields, setFields] = useState<FormFields>({ 
    user: {}, 
    password: {} 
  })

  const [error, setError] = useState<{ 
    user?: string, 
    password?: string,
    general?: 'user' | 'password' | 'general'
   }>({})

  function handleChangeInput(fieldName: 'user' | 'password', value: string) {
    setFields(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value }
    }))
  }

  function handleSubmit() {
    let validated = true

    const user = fields.user.value
    const password = fields.password.value

    if(!user && user === '') {
      setError((prev) => ({...prev, user: "Este campo é obrigatório"}))
      validated = false
    }
    if(!password && password === '') {
      setError((prev) => ({...prev, password: "Este campo é obrigatório"}))
      validated = false
    }

    if(!user || user === '' || !password || password === '') return

    // Login

    loginUser({ 
      user,
      password
    })
    .then(({ accessToken }) => {
      console.log(accessToken)
    })
    .catch((err) => {
      setError({ [err.target]: err.message })
    })
  }

  return <div className='h-full w-full flex items-center justify-center'>
    <div className='bg-gray-800 h-[30rem] w-[30rem] rounded-md py-6 px-3'>
      <form className='w-full h-full flex flex-1 flex-col justify-center space-y-6'>
        <div className='px-3'>
          <Input
            id="input-user"
            label="Seu usuário"
            value={fields.user.value}
            onChange={(value) => handleChangeInput('user', value)}
            error={error.user}
            icon={<FaUser className='size-3.5' />}
          />
        </div>
        
        <div className='px-3'>
          <Input
            id="input-pass"
            label="Sua senha"
            value={fields.password.value}
            onChange={(value) => handleChangeInput('password', value)}
            error={"tTess"}
            showPasswordToggle
            icon={<FaLock className='size-3.5' />}
          />
        </div>

        <span className='w-full h-fit flex justify-center mt-4'>
          <button type='button' onClick={handleSubmit} className='border border-emerald-500 bg-transparent w-60 py-2 rounded-xl cursor-pointer hover:bg-emerald-500 transition-all ease-in-out duration-300'>
            Entrar
          </button>
        </span>

        <span>{error.general}</span>
      </form>
    </div>
  </div>
}
