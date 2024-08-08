import { UMRTIE_VZTAH_K_ZOSNULEMU_MANZEL } from "../constants.js";

export function evaluate(payload, date) {
  if (payload.umrtie_vztah_k_zosnulemu === UMRTIE_VZTAH_K_ZOSNULEMU_MANZEL && payload.vy_pocet_deti > 0) {
    return {
      isEntitled: true,
      customData: { averageAmount: 192.16 },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
