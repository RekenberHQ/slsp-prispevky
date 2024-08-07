import { CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_PES, CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP } from "../constants.js";
import { getOtherMembersOfTheHousehold } from "../get_other_members_of_the_household.js";

export function evaluate(payload, date) {
  const clenovia = getOtherMembersOfTheHousehold(payload);
  const clenoviaVOpatereSNarokom = clenovia.filter(
    (c) =>
      c.zdravotna_situacia.includes(CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_TZP) &&
      c.zdravotna_situacia.includes(CLEN_V_DOMACNOSTI_ZDRAVOTNA_SITUACIA_PES)
  );

  if (clenoviaVOpatereSNarokom.length > 0) {
    return {
      isEntitled: true,
      customData: { totalAmount: 61.02 * clenoviaVOpatereSNarokom.length, amountPerPerson: 61.02, numberOfPersons: clenoviaVOpatereSNarokom.length },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
