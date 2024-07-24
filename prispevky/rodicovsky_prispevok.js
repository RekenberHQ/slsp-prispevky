import { STAV_OPATERY_VO_VASEJ_OPATERE, STAV_OPATERY_V_OPATERE_OBOCH_RODICOV, ZDRAVONA_SITUACIA_DIETATA_CHRONICKE_OCHORENIE } from "../constants.js";
import { getChildren } from "../get_children.js";
import { monthDiff, parseIsoDate } from "../app_util.js";

export function evaluate(payload, date) {
  const children = getChildren(payload);

  var detiVOpatere = children.filter((d) => d.stavOpatery == STAV_OPATERY_VO_VASEJ_OPATERE || d.stavOpatery == STAV_OPATERY_V_OPATERE_OBOCH_RODICOV);

  var uzPoberateKonflitknyNarok =
    detiVOpatere
      .map(
        (d) =>
          d.dieta_prispevok_na_starostlivost || (d.dieta_poberate_matersku_davku && d.dieta_materska_davka_do == null)
      )
      .filter((d) => d).length > 0;

  function spocitajPrispevok(d) {
    if (d.dieta_zdravotna_situacia.includes(ZDRAVONA_SITUACIA_DIETATA_CHRONICKE_OCHORENIE)) {
      return {
        splnuje: monthDiff(parseIsoDate(d.birth_date), new Date()) <= 72,
        vyska: d.dieta_materska_davka_do != null ? 473.3 : 345.2,
        doba: 6,
      };
    } else {
      return {
        splnuje: monthDiff(parseIsoDate(d.birth_date), new Date()) < 36,
        vyska: d.dieta_materska_davka_do != null ? 473.3 : 345.2,
        doba: 3,
      };
    }
  }

  var detiSNarokom = detiVOpatere
    .map(spocitajPrispevok)
    .filter((d) => d.splnuje)
    .sort((a, b) => (a.vyska > b.vyska ? -1 : 1));

  if (detiSNarokom.length > 0 && !uzPoberateKonflitknyNarok) {
    return { isEntitled: true, customData: { amount: detiSNarokom[0].vyska, duration: detiSNarokom[0].doba } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
