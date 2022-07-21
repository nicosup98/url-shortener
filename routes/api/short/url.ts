import { Handlers } from "$fresh/server.ts";
import { BASE_URL } from "../../../utils/constant.ts"
import { connectRedis } from "../../../utils/redis.ts"
import { Status,STATUS_TEXT } from "https://deno.land/std@0.148.0/http/mod.ts"
import * as log from "https://deno.land/std@0.148.0/log/mod.ts"
import {nanoid} from "https://deno.land/x/nanoid@v3.0.0/mod.ts"

export const handler: Handlers = {
    async POST(_req,_ctx){

        const redis = await connectRedis()

        const url =await _req.text()
        const uuid = nanoid()
        const day = 86400
        try {
            await redis.set(uuid,url,{ex:day})
            await redis.save()
        } catch (error) {
            log.error(error)
        }
    
        redis.close()
        return new Response(`${BASE_URL}/${uuid}`,{
            headers:{
                "Content-Type": "text/plain"
            },
            status: Status.OK,
            statusText: STATUS_TEXT[Status.OK]
        })
    }

}