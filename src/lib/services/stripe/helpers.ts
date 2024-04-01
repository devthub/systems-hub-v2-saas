import { getBaseURI } from '@/lib/utils/get-envs';
import { stripe } from './get-stripe';

// Generate Customer portal
export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXTAUTH_URL + '/dashboard/billing',
    });

    return portalSession.url;
  } catch (error) {
    console.error('🚀 ~ file: helpers.ts:15 ~ generateCustomerPortalLink ~ error:', error);

    return undefined;
  }
}

export async function hasSubscription(stripeCustomerId: string) {
  if (stripeCustomerId) {
    const subscriptions = await stripe.subscriptions.list({
      customer: String(stripeCustomerId),
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: `${getBaseURI()}/dashboard/?success=true`,
    cancel_url: `${getBaseURI()}/dashboard/?cancel=true`,
    customer: customer,
    line_items: [{ price: 'price_1OmceoCIpTU9V9MObMycdDLb', quantity: 1 }],
    mode: 'subscription',
  });

  return checkout.url;
}
