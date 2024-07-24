import { readFileSync } from "fs";

import { evaluate } from "../../prispevky/pridavok_na_dieta.js";
import { loadJsonSync, assert, deepEqual } from "../../test_util.js";

const RESOURCES = "tests/pridavok_na_dieta/resources";
const date = new Date("2024-01-01T00:00:00Z");

const client1 = loadJsonSync(`${RESOURCES}/client_1.json`);
const result1 = evaluate(client1, date);
assert(deepEqual(result1, { isEntitled: true, customData: { amountPerKid: 60, amountTotal: 120, numberOfKids: 2 } }));

const client2 = loadJsonSync(`${RESOURCES}/client_2.json`);
const result2 = evaluate(client2, date);
assert(deepEqual(result2, { isEntitled: true, customData: { amountPerKid: 60, amountTotal: 60, numberOfKids: 1 } }));

const client3 = loadJsonSync(`${RESOURCES}/client_3.json`);
const result3 = evaluate(client3, date);
assert(deepEqual(result3, { isEntitled: true, customData: { amountPerKid: 60, amountTotal: 60, numberOfKids: 1 } }));

const client4 = loadJsonSync(`${RESOURCES}/client_4.json`);
const result4 = evaluate(client4, date);
assert(deepEqual(result4, { isEntitled: false, customData: {} }));

const client5 = loadJsonSync(`${RESOURCES}/client_5.json`);
const result5 = evaluate(client5, date);
assert(deepEqual(result5, { isEntitled: false, customData: {} }));

const client6 = loadJsonSync(`${RESOURCES}/client_6.json`);
const result6 = evaluate(client6, date);
assert(deepEqual(result6, { isEntitled: false, customData: {} }));


console.log("OK");
