import { CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_OSOBNA_ASISTENCIA, CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP } from "../constants.js";
import { getOtherMembersOfTheHousehold } from "../get_other_members_of_the_household.js";

export function evaluate(payload, date) {
  const clenovia = getOtherMembersOfTheHousehold(payload);
  const clenoviaVOpatereSNarokom = clenovia.filter(
    (c) =>
      c.zdravotna_situacia.includes(CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP) &&
      c.zdravotna_situacia.includes(CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_OSOBNA_ASISTENCIA) &&
      !c.poberate_prispevok_na_opatrovanie
  );

  if (clenoviaVOpatereSNarokom.length > 0) {
    return { isEntitled: true, customData: { amountPerHour: 5.83, numberOfPersons: clenoviaVOpatereSNarokom.length, maxNumberOfHoursPerYear: 7300 } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
