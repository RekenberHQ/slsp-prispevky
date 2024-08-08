import { UMRTIE_VZTAH_K_ZOSNULEMU_MANZEL } from "../constants.js";

export function evaluate(payload, date) {
  if (payload.umrtie_vztah_k_zosnulemu === UMRTIE_VZTAH_K_ZOSNULEMU_MANZEL) {
    return {
      isEntitled: true,
      customData: { averageAmount: 288.1 },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
