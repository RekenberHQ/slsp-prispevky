import { CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_ZVYSENA_HYGIENA, CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP } from "../constants.js";
import { getOtherMembersOfTheHousehold } from "../get_other_members_of_the_household.js";

export function evaluate(payload, date) {
  const clenovia = getOtherMembersOfTheHousehold(payload);
  const clenoviaVOpatereSNarokom = clenovia.filter(
    (c) =>
      c.zdravotna_situacia.includes(CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP) &&
      c.zdravotna_situacia.includes(CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_ZVYSENA_HYGIENA)
  );

  if (clenoviaVOpatereSNarokom.length > 0) {
    return {
      isEntitled: true,
      customData: { totalAmount: 25.43 * clenoviaVOpatereSNarokom.length, amountPerPerson: 25.43, numberOfPersons: clenoviaVOpatereSNarokom.length },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
