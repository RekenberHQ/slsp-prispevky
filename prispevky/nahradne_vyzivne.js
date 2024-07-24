import { STAV_OPATERY_VO_VASEJ_OPATERE } from "../constants.js";
import { getChildren } from "../get_children.js";
import { monthDiff, parseIsoDate } from "../app_util.js";

export function evaluate(payload, date) {
  const children = getChildren(payload);

  var detiVOpatere = children.filter((d) => d.stavOpatery == STAV_OPATERY_VO_VASEJ_OPATERE && monthDiff(parseIsoDate(d.birth_date), new Date()) <= 25 * 12);

  if (detiVOpatere.length > 0) {
    return {
      isEntitled: true,
      customData: {
        numberOfChildren: detiVOpatere.length,
        minimumAmountPerKid: 32.69,
        averageAmountPerKidMinimum: 100,
        averageAmountPerKidMaximum: 150,
        amount: 100,
        frequency: "monthly",
      },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
