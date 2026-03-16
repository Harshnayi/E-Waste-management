import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { context } = await req.json();
    const AI_SERVICE_KEY = Deno.env.get("AI_SERVICE_KEY");
    if (!AI_SERVICE_KEY) throw new Error("AI_SERVICE_KEY is not configured");

    const userContext = context || {};
    const devicesRecycled = userContext.devicesRecycled || 0;
    const currentPage = userContext.currentPage || "home";
    const recentDevices = userContext.recentDevices || [];

    // Using a generic AI gateway (can be configured for any provider)
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a friendly e-waste recycling advisor. Generate 3 personalized recycling tips based on the user's context.

User context:
- Devices recycled so far: ${devicesRecycled}
- Currently viewing: ${currentPage}
- Recent devices recycled: ${recentDevices.join(", ") || "none yet"}

Generate tips that are:
- Actionable and specific
- Encouraging and motivating
- Relevant to their recycling journey stage
- Include an eco-fact where possible

Respond in valid JSON:
{
  "tips": [
    {
      "title": "short title",
      "description": "2-3 sentence tip",
      "icon": "one of: leaf, recycle, zap, heart, shield, star",
      "category": "one of: beginner, intermediate, advanced, fun-fact"
    }
  ],
  "motivationalMessage": "A short encouraging message based on their progress"
}`,
          },
          {
            role: "user",
            content: "Give me personalized recycling tips based on my activity.",
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service unavailable");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let parsed;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = {
        tips: [
          {
            title: "Start Your Journey",
            description: "Every device recycled makes a difference. Start with small electronics like old phones or chargers.",
            icon: "leaf",
            category: "beginner",
          },
          {
            title: "Data Safety First",
            description: "Always factory reset your devices before recycling. Remove SIM cards and storage media for your security.",
            icon: "shield",
            category: "beginner",
          },
          {
            title: "Spread the Word",
            description: "Tell friends and family about e-waste recycling. Community impact grows exponentially!",
            icon: "heart",
            category: "fun-fact",
          },
        ],
        motivationalMessage: "Every small step counts towards a greener future! 🌱",
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("recycling-tips error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
