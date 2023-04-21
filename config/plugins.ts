module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "noreplay@mmcerber.com",
        defaultReplyTo: "noreplay@mmcerber.com",
      },
    },
  },
  // ...
});
