import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  let url = "";
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // ここで動的な商品生成
          price_data: {
            currency: "jpy",
            product_data: {
              name: "動的商品: " + crypto.randomUUID(),
            },
            unit_amount: 2000 + Math.floor(Math.random() * 1000),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/?success=true`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      payment_method_configuration: "pmc_1Q5VtjDmzAPgcoPh6QCNbBWd",
    });
    url = session.url as string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(error.message, {
      status: error.statusCode || 500,
    });
  }
  if (url) {
    redirect(url);
  }
}
