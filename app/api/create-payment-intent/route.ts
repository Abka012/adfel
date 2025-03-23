// File: app/api/create-payment/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Use the latest API version
});

export async function POST(request: Request) {
  try {
    const { amount, currency = 'usd', frequency } = await request.json();

    // Validate the amount
    if (!amount || amount < 100) { // Min amount is $1.00
      return NextResponse.json(
        { error: 'Invalid amount. Minimum donation is $1.00' },
        { status: 400 }
      );
    }

    // Create payment intent options
    const paymentIntentOptions: Stripe.PaymentIntentCreateParams = {
      amount, // amount in cents
      currency,
      metadata: {
        donation_type: frequency // Track if this is a one-time or recurring donation
      }
    };

    // For recurring donations, we would typically use Stripe Subscriptions
    // This is a simplified version - for production, you'd want to implement
    // subscriptions properly using Stripe Subscription API
    if (frequency === 'monthly') {
      // In a real implementation, you'd create a subscription instead
      // For now, we'll just add metadata to track it
      paymentIntentOptions.metadata.recurring = 'true';
    }

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create(paymentIntentOptions);

    // Return the client secret to the client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);

    return NextResponse.json(
      { error: 'Error creating payment intent' },
      { status: 500 }
    );
  }
}
