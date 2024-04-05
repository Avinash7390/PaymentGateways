const handlePayment = async () => {
  const stripe = await loadStripe(
    "sk_test_51Oufb_wtfyoucopiedthiskeyaswellmanthisisjustsomedummykey"
  );

  if (paymentDone) {
    navigate(`/payment-success/`);
    return;
  }

  const response = await axios.post(
    "/api/payment/register-and-make-payment-session",
    { eventId: Payload1, userId: Payload2, amount: Payload3 }
  );
  const result = stripe.redirectToCheckout({
    sessionId: response?.data?.sessionID,
  });
};
