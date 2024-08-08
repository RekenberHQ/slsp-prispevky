import { YES } from "../constants.js";

export function evaluate(payload, date) {
  if (payload.umrtie_pracovny_uraz === YES) {
    return {
      isEntitled: true,
      customData: { maxAmount: 3308.80 },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
