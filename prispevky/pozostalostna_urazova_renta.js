import { YES } from "../constants.js";

export function evaluate(payload, date) {
  if (payload.umrtie_pracovny_uraz === YES && payload.umrtie_zosnuly_vyzivovacia_povinnost === YES) {
    return {
      isEntitled: true,
      customData: { amount: payload.umrtie_vyska_vyzivovacej_povnnosti },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
