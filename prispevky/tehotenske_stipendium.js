import { ZDRAVONA_SITUACIA_TEHOTNA } from "../constants.js";

export function evaluate(payload, date) {
  const tehotna = payload.vy_zdravotna_situacia.includes(ZDRAVONA_SITUACIA_TEHOTNA);
  const studuje = payload.vy_studujete_dennou_formou;
  const zarobkovoCinna = payload.vy_prijmy_ste_zamestnana || payload.vy_prijmy_podnikate_na_zivnost;

  if (tehotna && studuje && !zarobkovoCinna) {
    return { isEntitled: true, customData: { amount: 200 } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
