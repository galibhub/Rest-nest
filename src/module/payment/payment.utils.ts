// src/module/payment/payment.utils.ts

import Stripe from "stripe";
import config from "../../config";
import { stripe } from "../../lib/stripe";

interface ICreateCheckoutSessionPayload {
  rentalRequestId: string;
  propertyTitle: string;
  amount: number;
}

export const createCheckoutSession = async (
  payload: ICreateCheckoutSessionPayload,
): Promise<Stripe.Checkout.Session> => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: payload.propertyTitle,
          },
          unit_amount: payload.amount * 100,
        },
        quantity: 1,
      },
    ],

    metadata: {
      rentalRequestId: payload.rentalRequestId,
    },

    success_url: "https://google.com",
    cancel_url: "https://google.com",
  });

  return session;
};
