import { ZDRAVONA_SITUACIA_TEHOTNA } from "../constants.js";

export function evaluate(payload, date) {
  const tehotna = payload.vy_zdravotna_situacia.includes(ZDRAVONA_SITUACIA_TEHOTNA);
  const zarobkovoCinnyPartner = payload.prijmy_partner_ste_zamestnana || payload.partner_prijmy_podnikate_na_zivnost1;

  if (tehotna && zarobkovoCinnyPartner) {
    return { isEntitled: true, customData: { maximumAmmount: 782.3 } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
