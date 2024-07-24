import { STAV_OPATERY_VO_VASEJ_OPATERE, STAV_OPATERY_V_OPATERE_OBOCH_RODICOV } from "../constants.js";
import { getChildren } from "../get_children.js";
import { monthDiff, parseIsoDate } from "../app_util.js";

export function evaluate(payload, date) {
  const children = getChildren(payload);

  var detiVOpatere = children.filter((d) => d.stavOpatery == STAV_OPATERY_VO_VASEJ_OPATERE || d.stavOpatery == STAV_OPATERY_V_OPATERE_OBOCH_RODICOV);

  function findMultiples(children) {
    const birthDateMap = new Map();

    // Populate the birthDateMap with birth dates and corresponding children
    children.forEach((child) => {
      const birthDate = child.birth_date;
      if (!birthDateMap.has(birthDate)) {
        birthDateMap.set(birthDate, []);
      }
      birthDateMap.get(birthDate).push(child.name);
    });

    // Find twins, triplets, etc.
    const multiples = [];
    birthDateMap.forEach((names, birthDate) => {
      if (names.length > 1) {
        multiples.push({ birth_date: birthDate, multiple: names.length, children: names });
      }
    });

    // Check if any multiples were born at most 2 years apart
    multiples.forEach((multiple) => {
      const birthDate = new Date(multiple.birth_date);
      multiple.years_apart = multiples.some((other) => {
        if (other !== multiple) {
          const otherBirthDate = new Date(other.birth_date);
          const diffYears = Math.abs(otherBirthDate.getFullYear() - birthDate.getFullYear());
          const diffMonths = Math.abs(otherBirthDate.getMonth() - birthDate.getMonth());
          const diffDays = Math.abs(otherBirthDate.getDate() - birthDate.getDate());

          return diffYears < 2 || (diffYears === 2 && (diffMonths < 0 || (diffMonths === 0 && diffDays <= 0)));
        }
        return false;
      });
    });

    return multiples;
  }

  var multiples = findMultiples(detiVOpatere);

  function spocitajPrispevok(d) {
    if ((d.multiple >= 3 || d.years_apart) && monthDiff(parseIsoDate(d.birth_date), new Date()) <= 15 * 12) {
      return {
        splnuje: true,
        vyska: 110.36 * d.multiple,
        multiple: d.multiple
      };
    } else {
      return {
        splnuje: false,
        vyska: 0,
        multiple: 0
      };
    }
  }

  var multiplesSNarokom = multiples.map(spocitajPrispevok).filter((d) => d.splnuje);

  if (multiplesSNarokom.length > 0) {
    return {
      isEntitled: true,
      customData: {
        amountPerKid: 110.36,
        amountTotal: multiplesSNarokom.map((m) => m.vyska).reduce((partialSum, a) => partialSum + a, 0),
        numberOfKids: multiplesSNarokom.map((m) => m.multiple).reduce((partialSum, a) => partialSum + a, 0),
      },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
