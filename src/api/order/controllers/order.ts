import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-11-15",
});

/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { products, userId } = ctx.request.body;

      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.itemId, {
              fields: ["name", "price", "itemQuantity", "id"],
              limit: 1,
            });

          return {
            price_data: {
              currency: "pln",
              product_data: {
                name: `${item.name}. Rozmiar: ${product.itemSize}`,
                metadata: {
                  url: product.itemUrl,
                },
              },
              unit_amount: item.price * 100,
            },
            quantity: product.itemQuantity,
          };
        })
      );

      try {
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          success_url: `${process.env.STRIPE_FRONTEND}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.STRIPE_FRONTEND}/cancel?session_id={CHECKOUT_SESSION_ID}`,
          line_items: lineItems,
          shipping_address_collection: { allowed_countries: ["PL"] },
          payment_method_types: ["card"],
          metadata: { orderDate: `${new Date().toLocaleDateString() + ""}` },
        });

        if (userId === null) {
          await strapi.service("api::order.order").create({
            data: {
              products,
              stripeId: session.id,
            },
          });
        } else {
          await strapi.service("api::order.order").create({
            data: {
              userId: userId.toString(),
              products,
              stripeId: session.id,
            },
          });
        }

        return { stripeSession: session };
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  })
);
