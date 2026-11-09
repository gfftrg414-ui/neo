
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const products: Record<string, { price: string }> = {
  shop: { price: "از ۳ میلیون تومان" },
  restaurant: { price: "از ۲ میلیون تومان" },
  company: { price: "از ۲.۵ میلیون تومان" },
  gaming: { price: "از ۲.۸ میلیون تومان" },
  personal: { price: "از ۱.۵ میلیون تومان" },
  news: { price: "از ۳.۵ میلیون تومان" },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (data: object, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();

    const customerName = String(body.customer_name ?? "").trim();
    const customerPhone = String(body.customer_phone ?? "").trim();
    const productId = String(body.product_id ?? "").trim();
    const customerNote = String(body.customer_note ?? "").trim();

    if (
      customerName.length < 2 ||
      customerName.length > 80 ||
      !/^09\d{9}$/.test(customerPhone) ||
      !products[productId] ||
      customerNote.length > 500
    ) {
      return json({ error: "اطلاعات سفارش معتبر نیست." }, 400);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const secretKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !secretKey) {
      return json({ error: "تنظیمات سرور کامل نیست." }, 500);
    }

    const supabase = createClient(supabaseUrl, secretKey);

    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name: customerName,
        customer_phone: customerPhone,
        product_id: productId,
        price: products[productId].price,
        customer_note: customerNote || null,
        status: "در انتظار بررسی",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Order insert failed:", error);
      return json({ error: "ثبت سفارش انجام نشد." }, 500);
    }

    return json({
      success: true,
      message: "سفارش با موفقیت ثبت شد.",
      order_id: data.id,
      created_at: data.created_at,
    });
  } catch {
    return json({ error: "درخواست نامعتبر است." }, 400);
  }
});
