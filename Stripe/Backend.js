import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Oufb1SIR9oMWB8aBQzwT62Dh2Rs2H1zprguDiH6XqhC8SY4S8kJ7hXEj2yZsACzOTqjkhAFoeIFFHx0Ne6dj0PE00v7yeOno3"
);

const registerAndMakePaymentController = async (req, res, next) => {
  const { payload1, payload2, payload3 } = req.body;
  if (!payload1) {
    return next(errorHandler(400, "Please Provide eventId"));
  }
  if (!payload2) {
    return next(errorHandler(400, "Please Provide UserId"));
  }
  if (!payload3) {
    return next(errorHandler(400, "Please Select Ticket"));
  }
  const event = await Event.findById(payload3);
  const price = amount;
  const qt = 1;
  const lineItem = [
    {
      price_data: {
        currency: "USD",
        product_data: {
          name: event.title,
        },
        unit_amount: Math.round(price * 100),
      },
      quantity: qt,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: lineItem,
    mode: "payment",
    success_url: `http://localhost:5173/payment-success/`,
    cancel_url: `http://localhost:5173/paymentCancel/`,
  });

  res.status(200).json({
    message: "Successfully Posted!",
    sessionID: session.id,
  });
};
