import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { imageBase64 } = await req.json();
    const AI_SERVICE_KEY = Deno.env.get("AI_SERVICE_KEY");
    if (!AI_SERVICE_KEY) throw new Error("AI_SERVICE_KEY is not configured");

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
            content: `You are an e-waste recycling expert. When shown an image of an electronic device:
1. Identify the device type and category (smartphone, laptop, TV, battery, appliance, etc.)
2. Estimate its recyclability percentage
3. List hazardous materials it may contain (lead, mercury, cadmium, lithium, etc.)
4. Provide 3-4 specific recycling instructions
5. Estimate the carbon credit value for recycling this device (1-100 scale)
6. Provide an environmental impact summary

Respond in valid JSON with this structure:
{
  "deviceName": "string",
  "category": "string",
  "recyclability": number (0-100),
  "hazardousMaterials": ["string"],
  "recyclingInstructions": ["string"],
  "carbonCreditValue": number,
  "environmentalImpact": "string",
  "confidence": number (0-100)
}

If the image doesn't show an electronic device, set confidence to 0 and deviceName to "Unknown" with a helpful message in environmentalImpact.`,
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Identify this electronic device and provide recycling information." },
              {
                type: "image_url",
                image_url: { url: imageBase64 },
              },
            ],
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

    // Parse JSON from the response (handle markdown code blocks)
    let parsed;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = {
        deviceName: "Unknown Device",
        category: "Unknown",
        recyclability: 0,
        hazardousMaterials: [],
        recyclingInstructions: ["Could not analyze the image. Please try again with a clearer photo."],
        carbonCreditValue: 0,
        environmentalImpact: content,
        confidence: 0,
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("identify-device error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
