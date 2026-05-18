import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

async function sha256(text: string) {
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)

  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { name, rating, content } = await req.json()

    if (!name || !content || !rating) {
      return new Response(JSON.stringify({ error: "닉네임, 별점, 후기를 입력해줘" }), {
        status: 400,
        headers: corsHeaders,
      })
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("cf-connecting-ip") ||
      "unknown"

    const userAgent = req.headers.get("user-agent") || "unknown"
    const secret = Deno.env.get("IP_HASH_SECRET") || "fallback-secret"
    const ipHash = await sha256(`${ip}-${secret}`)

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const since = new Date()
    since.setDate(since.getDate() - 21)

    const { data: recentReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("ip_hash", ipHash)
      .gte("created_at", since.toISOString())
      .limit(1)
      .maybeSingle()

    if (recentReview) {
      return new Response(
        JSON.stringify({ error: "같은 IP에서는 3주에 한 번만 리뷰를 작성할 수 있어" }),
        {
          status: 429,
          headers: corsHeaders,
        }
      )
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name: String(name).trim().slice(0, 12),
        rating: Number(rating),
        content: String(content).trim().slice(0, 300),
        ip_hash: ipHash,
        user_agent: userAgent,
      })
      .select()
      .single()

    if (error) throw error

    return new Response(JSON.stringify({ review: data }), {
      status: 200,
      headers: corsHeaders,
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: "리뷰 등록 실패" }), {
      status: 500,
      headers: corsHeaders,
    })
  }
})