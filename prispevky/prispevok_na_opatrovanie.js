import { YES, CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP } from "../constants.js";
import { getOtherMembersOfTheHousehold } from "../get_other_members_of_the_household.js";

export function evaluate(payload, date) {
  const clenovia = getOtherMembersOfTheHousehold(payload);
  const clenoviaVOpatereSNarokom = clenovia.filter(
    (c) =>
      c.vo_vasej_starostlivosti === YES &&
    c.zdravotna_situacia.includes(CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP) &&
    !c.prispevok_na_osobnu_asistenciu
  );

  if (clenoviaVOpatereSNarokom.length > 0) {
    const amount = (clenoviaVOpatereSNarokom.length > 1 ? 818.6 : 615.5) - (payload.clen_v_domacnosti_zvysenie_dochodku_pre_bezvladnost_vyska || 0);
    return { isEntitled: true, customData: { amount: amount, numberOfPersons: clenoviaVOpatereSNarokom.length } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
