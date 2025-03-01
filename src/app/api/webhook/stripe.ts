import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const signature = (await headers()).get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Invalid Signature",
      },
      {
        status: 400,
      },
    );
  }


  const session = event.data.object as Stripe.Checkout.Session

  console.log(event.type)

  if (event.type === 'checkout.session.completed') {
    const credits = Number(session.metadata?.['credits'])
  }
  return NextResponse.json({
    message: "Hello World!",
  });
}
