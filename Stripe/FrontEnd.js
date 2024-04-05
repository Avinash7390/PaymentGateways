const handlePayment = async () => {
  const stripe = await loadStripe(
    "pk_test_51Oufb1SIR9oMWB8a1wc6gZSgOs3m4vTd6DYIup7jE5yyRky351W1nDEPAgzcmXqsuXaNqg1pfFlFall8OAHZZhKR00TpCXsACh"
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
