import { ZDRAVONA_SITUACIA_TEHOTNA } from "./constants.js";

export function evaluate(payload, date) {
  if (payload.vy_zdravotna_situacia.includes(ZDRAVONA_SITUACIA_TEHOTNA)) {
    return {
      isEntitled: true,
      customData: {
        amount: parseInt(payload.vy_pocet_deti) > 4 ? 151.37 : 829.86,
      },
    };
  } else {
    return {
      isEntitled: false,
      customData: {},
    };
  }
}
