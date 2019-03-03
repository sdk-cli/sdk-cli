module.exports = {
  root: true,
  extends: "airbnb-base",
  rules: {
    "no-console": process.env.NODE_ENV !== "production" ? 0 : 2
  }
};
