import { YES, UMRTIE_VZTAH_K_ZOSNULEMU_MANZEL } from "../constants.js";

export function evaluate(payload, date) {
  if (payload.umrtie_pracovny_uraz === YES && payload.umrtie_vztah_k_zosnulemu === UMRTIE_VZTAH_K_ZOSNULEMU_MANZEL) {
    return {
      isEntitled: true,
      customData: { maxAmount: 66153.8 },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
