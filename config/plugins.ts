module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "noreplay@freecommerce.shop",
        defaultReplyTo: "noreplay@freecommerce.shop",
      },
    },
  },
  // ...
});
