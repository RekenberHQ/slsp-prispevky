import {
  STAV_OPATERY_VO_VASEJ_OPATERE,
  STAV_OPATERY_V_OPATERE_OBOCH_RODICOV,
  DIETA_SKOLSKA_DOCHADZKA_NENAVSTEVUJE_SKOLU,
  DIETA_OSTATNE_NEMA_ZDRAVOTNE_POISTENIE,
  DIETA_OSTATNE_V_SPECIALNOM_ZARIADENI,
  DIETA_OSTATNE_VO_VYKONE_VAZBY,
} from "../constants.js";
import { getChildren } from "../get_children.js";
import { monthDiff, parseIsoDate } from "../app_util.js";

export function evaluate(payload, date) {
  const children = getChildren(payload);

  var detiVOpatere = children.filter((d) => d.stavOpatery == STAV_OPATERY_VO_VASEJ_OPATERE || d.stavOpatery == STAV_OPATERY_V_OPATERE_OBOCH_RODICOV);

  function spocitajPrispevok(d) {
    const age = monthDiff(parseIsoDate(d.birth_date), new Date()) / 12;
    if (
      d.dieta_navstevuje_skolu === DIETA_SKOLSKA_DOCHADZKA_NENAVSTEVUJE_SKOLU ||
      age > 25 ||
      d.dieta_ostatne_informacie.includes(DIETA_OSTATNE_NEMA_ZDRAVOTNE_POISTENIE) ||
      d.dieta_ostatne_informacie.includes(DIETA_OSTATNE_V_SPECIALNOM_ZARIADENI) ||
      d.dieta_ostatne_informacie.includes(DIETA_OSTATNE_VO_VYKONE_VAZBY)
    ) {
      return {
        splnuje: false,
        vyska: 0,
      };
    } else {
      return {
        splnuje: true,
        vyska: 60,
      };
    }
  }

  var detiSNarokom = detiVOpatere.map(spocitajPrispevok).filter((d) => d.splnuje);

  if (detiSNarokom.length) {
    return { isEntitled: true, customData: { amountPerKid: 60, amountTotal: 60 * detiSNarokom.length, numberOfKids: detiSNarokom.length } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
