import stripeLoader from "stripe";

let stripe = new stripeLoader(process.env.STRIPE_SK, {
    apiVersion: '2020-08-27',
});

const charge = (token: string, amt: number) => {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'Billing Statement'
    });
};

export { charge };