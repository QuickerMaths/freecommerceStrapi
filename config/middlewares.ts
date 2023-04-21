export default [
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: "*",
      methods: ["GET", "POST", "PUT"],
      exposedHeaders: ["Authorization", "X-Requested-With"],
      allowedHeaders: ["Authorization", "Content-Type", "X-Requested-With"],
      maxAge: 31536000,
      credentials: true,
      // Add this line to allow the X-Requested-With header
      headers: "X-Requested-With, Content-Type, Authorization ",
    },
  },
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  "plugin::users-permissions.jwtCookieGetter",
];
