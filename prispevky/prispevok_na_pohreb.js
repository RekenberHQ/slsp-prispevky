export function evaluate(payload, date) {
  if (payload.umrtie_vztah_k_zosnulemu != null) {
    return {
      isEntitled: true,
      customData: { amount: 79.67 },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
