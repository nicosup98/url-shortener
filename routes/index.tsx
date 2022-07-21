/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import Shortener from "../islands/Shortener.tsx"
import { PageProps,Handlers } from "$fresh/server.ts"
import { BASE_URL } from "../utils/constant.ts"
export default function Home({data}: PageProps<string>) {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md`}>
      <Shortener BASE_URL={data}/>
    </div>
  );
}

export const handler: Handlers<string> = {
  GET(_,_ctx){
    return _ctx.render(BASE_URL)
  }
}
