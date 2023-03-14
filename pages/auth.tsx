import Input from "@/components/Input"
import { useState, useCallback } from "react"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { SiFaceit } from 'react-icons/si'

const Auth = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login')

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
        }, [])

    const login = useCallback(async () => {
            try {
                await signIn('credentials', {
                    email,
                    password,
                    redirect: false,
                    callbackUrl: '/'
                })
    
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        }, [email, password, router])    

    const register = useCallback(async () => {
        try {
           await axios.post('/api/register', {
            email,
            name,
            password
        })

        login()
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login])


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
            <nav className="px-12 py-5">
                <img src="/images/logo.png" alt="Logo" className="h-12" />
            </nav>
            <div className="flex justify-center">
                <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 font-semibold">
                        {variant === 'login' ? 'Sign in' : 'Register'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {variant === 'register' && (
                        <Input 
                        id="name"
                        label="Username"
                        onChange={(ev:any) => {setName(ev.target.value)}}
                        value={name}
                        />
                        )}
                        <Input 
                        id="email"
                        label="Email"
                        type="email"
                        onChange={(ev:any) => {setEmail(ev.target.value)}}
                        value={email}
                        />
                        <Input 
                        id="password"
                        label="Password"
                        type="password"
                        onChange={(ev:any) => {setPassword(ev.target.value)}}
                        value={password}
                        />
                    </div>
                    <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                        {variant === 'login' ? 'Sign in' : 'Register'}
                    </button>
                    <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                        <div 
                        onClick={() => signIn('google', {callbackUrl: '/' })}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <FcGoogle size={30}/>
                        </div>
                        <div 
                        onClick={() => signIn('github', {callbackUrl: '/' })}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <FaGithub size={30}/>
                        </div>
                        <div 
                        onClick={() => signIn('discord', { callbackUrl: '/' })}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <FaDiscord size={30}/>
                        </div>
                        <div
                        onClick={() => {
                            //signIn('faceit'), { callbackUrl: '/' }
                            alert('Faceit login is not available yet')
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <SiFaceit size={30} color="FF5500"/>
                        </div>
                    </div>
                    <p className="text-neutral-500 mt-12">
                        {variant === 'login' ? "Don't have an account?" : "Already have an account?"}  <a href="#" className="text-white font-semibold">
                        <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">{variant === 'login' ? "Create one" : "Sign in"}</span></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth
