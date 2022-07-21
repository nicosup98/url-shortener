/** @jsx h */
import { h } from "preact";
import { PageProps, Handlers } from "$fresh/server.ts";
import { connectRedis } from "../utils/redis.ts"
import Redirectioner from "../islands/Redirectioner.tsx"

export default function Greet({data}: PageProps<string>) {
  return <Redirectioner url={data} />
}


export const handler: Handlers<string | null> = {
  async GET(_,ctx){
    const redis = await connectRedis()
    const {id} = ctx.params

    const url = await redis.get(id)
    return ctx.render(url)
  }
}
