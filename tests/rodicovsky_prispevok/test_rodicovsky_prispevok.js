import { readFileSync } from "fs";

import { evaluate } from "../../prispevky/rodicovsky_prispevok.js";
import { loadJsonSync, assert, deepEqual } from "../../test_util.js";

const RESOURCES = "tests/rodicovsky_prispevok/resources";
const date = new Date("2024-01-01T00:00:00Z");

const client1 = loadJsonSync(`${RESOURCES}/client_1.json`);
const result1 = evaluate(client1, date);
assert(deepEqual(result1, { isEntitled: true, customData: { amount: 345.2, duration: 3 } }));

const client2 = loadJsonSync(`${RESOURCES}/client_2.json`);
const result2 = evaluate(client2, date);
assert(deepEqual(result2, { isEntitled: true, customData: { amount: 345.2, duration: 6 } }));

const client3 = loadJsonSync(`${RESOURCES}/client_3.json`);
const result3 = evaluate(client3, date);
assert(deepEqual(result3, { isEntitled: true, customData: { amount: 473.3, duration: 3 } }));

const client4 = loadJsonSync(`${RESOURCES}/client_4.json`);
const result4 = evaluate(client4, date);
assert(deepEqual(result4, { isEntitled: false, customData: {} }));

const client5 = loadJsonSync(`${RESOURCES}/client_5.json`);
const result5 = evaluate(client5, date);
assert(deepEqual(result5, { isEntitled: false, customData: {} }));

console.log("OK");
