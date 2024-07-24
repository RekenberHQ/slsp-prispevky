import { ZDRAVONA_SITUACIA_TEHOTNA } from "../constants.js";

export function evaluate(payload, date) {
  const tehotna = payload.vy_zdravotna_situacia.includes(ZDRAVONA_SITUACIA_TEHOTNA);
  const zarobkovoCinna = payload.vy_prijmy_ste_zamestnana || payload.vy_prijmy_podnikate_na_zivnost;

  if (tehotna && zarobkovoCinna) {
    return { isEntitled: true, customData: { minimumAmount: 345.2, maximumAmmount: 1929.30 } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}