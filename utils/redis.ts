import { connect } from "https://deno.land/x/redis@v0.26.0/mod.ts";
import "https://deno.land/std@0.148.0/dotenv/load.ts"



export function connectRedis(){
    const hostname = Deno.env.get("REDISHOST")|| ""
    const port = Deno.env.get("REDISPORT") || ""
    const username = Deno.env.get("REDISUSER")
    const password = Deno.env.get("REDISPASSWORD")

    return connect({hostname,port, username,password})
}