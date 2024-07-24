import { STAV_OPATERY_VO_VASEJ_OPATERE, STAV_OPATERY_V_OPATERE_OBOCH_RODICOV, DIETA_ZDRAVONA_SITUACIA_CHRONICKE_OCHORENIE } from "../constants.js";
import { getChildren } from "../get_children.js";
import { monthDiff, parseIsoDate } from "../app_util.js";

export function evaluate(payload, date) {
  const children = getChildren(payload);

  const studuje = payload.vy_studujete_dennou_formou;
  const zarobkovoCinny = payload.vy_prijmy_ste_zamestnana || payload.vy_prijmy_podnikate_na_zivnost || payload.vy_prijmy_vysluhovy_dochodok;

  var detiVOpatere = children.filter((d) => d.stavOpatery == STAV_OPATERY_VO_VASEJ_OPATERE || d.stavOpatery == STAV_OPATERY_V_OPATERE_OBOCH_RODICOV);
  var uzPoberateKonflitknyNarok =
    detiVOpatere.map((d) => d.dieta_poberate_rodicovsky_prispevok || (d.dieta_poberate_matersku_davku && d.dieta_materska_davka_do == null)).filter((d) => d)
      .length > 0;

  function spocitajPrispevok(d) {
    if (d.dieta_zdravotna_situacia.includes(DIETA_ZDRAVONA_SITUACIA_CHRONICKE_OCHORENIE)) {
      return {
        splnuje: monthDiff(parseIsoDate(d.birth_date), new Date()) <= 72,
        vyska: 280,
        doba: 6,
      };
    } else {
      return {
        splnuje: monthDiff(parseIsoDate(d.birth_date), new Date()) < 36,
        vyska: 280,
        doba: 3,
      };
    }
  }

  var detiSNarokom = detiVOpatere
    .map(spocitajPrispevok)
    .filter((d) => d.splnuje)
    .sort((a, b) => (a.vyska > b.vyska ? -1 : 1));

  if (detiSNarokom.length > 0 && !uzPoberateKonflitknyNarok && (studuje || zarobkovoCinny)) {
    return { isEntitled: true, customData: { numberOfKids: detiSNarokom.length, amountPerKid: 280, totalAmount: 280 * detiSNarokom.length } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
