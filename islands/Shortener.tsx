/**@jsx h */

import { h } from "preact"
import { useState } from "preact/hooks"
import { tw } from "@twind"

export default function Shortener({BASE_URL}: {BASE_URL: string}){
    const [url,setUrl]=useState("")
    const [procesedUrl,setProcesedUrl]=useState("")
    const [ loading,setLoading ] = useState(false)
    async function handleClick(){
        setLoading(true)
        console.log({url})
        const resp = await fetch(`${BASE_URL}/api/short/url`,{body:url,method:"POST"})
        setProcesedUrl(await resp.text())
        setLoading(false)
        
    }

    function handleCopy(){
        navigator.clipboard.writeText(procesedUrl)
        alert("url copied to the clipboard")
    }

    function handleUrlUpdate(e:h.JSX.TargetedEvent<HTMLInputElement, Event>){
        const value = e.currentTarget.value

        console.log({value})

        setUrl(value)
    }

    return (
        <section class={tw`flex flex-col bg-gray-100 w-full p-2 space-y-2`}>
            <div class={tw`flex flex-col`}>
                <div class={tw`text-center`}>url shortner</div>
                <div class={tw`flex justify-center space-x-1.5`}>
                    <input type="text" class={tw`rounded h-8 text-center border-2 border-gray-500 outline-none focus:ring focus:border-gray-600`} value={url} onChange={handleUrlUpdate} />
                    <button class={tw`bg-gray-800 text-white rounded p-1 w-1/8 h-8 outline-none`} onClick={handleClick}>get url</button>
                </div>
            </div>
            <hr />
                {loading? "loading...":
                    procesedUrl && 
                    <div class={tw`flex justify-center space-x-2 `}>
                        <a href={procesedUrl} target="_blank"><span class={tw`border-b-1 border-black`}>your url</span></a>
                        <button class={tw`bg-indigo-200 rounded p-2`} onClick={handleCopy}>copy url</button>
                    </div>
                }
        </section>
    )

}

