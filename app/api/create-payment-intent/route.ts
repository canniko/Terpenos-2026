import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { items, currency = 'USD' } = await request.json();

    console.log('Creating checkout session for:', { items: items.length, totalAmount: items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0), currency });

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);

    // Get the origin for absolute URLs
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => {
        // Convert relative image path to absolute URL
        let imageUrl = item.product.image;
        if (imageUrl.startsWith('/')) {
          imageUrl = `${origin}${imageUrl}`;
        }

        return {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: item.product.name,
              description: item.product.description,
              images: [imageUrl],
            },
            unit_amount: Math.round(item.product.price * 100), // Convert to cents
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: {
        items: JSON.stringify(items.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        }))),
      },
    });

    console.log('Checkout session created:', session.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 