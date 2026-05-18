import { serve } from "https://deno.land/std@0.224.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
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
    return new Response(
      JSON.stringify({
        ok: true,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    )
  }

  try {
    const { name, rating, content, adminPassword } = await req.json()

    const cleanName = String(name || "")
      .trim()
      .slice(0, 12)

    const cleanContent = String(content || "")
      .trim()
      .slice(0, 300)

    const cleanRating = Number(rating)

    if (!cleanName || !cleanContent || !cleanRating) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "닉네임과 후기를 입력해주세요.",
        }),
        {
          status: 200,
          headers: corsHeaders,
        }
      )
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown"

    const userAgent = req.headers.get("user-agent") || "unknown"

    const secret =
      Deno.env.get("IP_HASH_SECRET") || "fallback-secret"

    const ipHash = await sha256(`${ip}-${secret}`)

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const isAdmin =
      String(adminPassword || "") ===
      Deno.env.get("REVIEW_ADMIN_PASSWORD")

    if (!isAdmin) {
      const since = new Date()
      since.setDate(since.getDate() - 21)

      const { data: recentReview, error: recentError } = await supabase
        .from("reviews")
        .select("id")
        .eq("ip_hash", ipHash)
        .gte("created_at", since.toISOString())
        .limit(1)
        .maybeSingle()

      if (recentError) {
        console.error(recentError)

        return new Response(
          JSON.stringify({
            ok: false,
            error: "리뷰 제한 확인 중 문제가 발생했습니다.",
          }),
          {
            status: 200,
            headers: corsHeaders,
          }
        )
      }

      if (recentReview) {
        return new Response(
          JSON.stringify({
            ok: false,
            blocked: true,
            error:
              "리뷰는 동일 IP 기준 3주에 한 번만 작성할 수 있습니다.",
          }),
          {
            status: 200,
            headers: corsHeaders,
          }
        )
      }
    }

    const { data: review, error: insertError } = await supabase
      .from("reviews")
      .insert({
        name: cleanName,
        rating: cleanRating,
        content: cleanContent,
        ip_hash: ipHash,
        user_agent: userAgent,
      })
      .select("*")
      .single()

    if (insertError) {
      console.error(insertError)

      return new Response(
        JSON.stringify({
          ok: false,
          error: "리뷰 등록에 실패했습니다.",
        }),
        {
          status: 200,
          headers: corsHeaders,
        }
      )
    }

    return new Response(
      JSON.stringify({
        ok: true,
        review,
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    )
  } catch (err) {
    console.error(err)

    return new Response(
      JSON.stringify({
        ok: false,
        error: "리뷰 등록 중 오류가 발생했습니다.",
      }),
      {
        status: 200,
        headers: corsHeaders,
      }
    )
  }
})