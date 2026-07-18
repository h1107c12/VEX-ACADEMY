import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { id, adminPassword } = await req.json()

    if (!id || !adminPassword) {
      return new Response(JSON.stringify({ error: "잘못된 요청" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    if (adminPassword !== Deno.env.get("REVIEW_ADMIN_PASSWORD")) {
      return new Response(JSON.stringify({ error: "관리자 인증 실패" }), {
        status: 401,
        headers: corsHeaders,
      })
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    )

    const { error } = await supabase.from("reviews").delete().eq("id", id)

    if (error) throw error

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: "삭제 실패" }), {
      status: 500,
      headers: corsHeaders,
    })
  }
})
