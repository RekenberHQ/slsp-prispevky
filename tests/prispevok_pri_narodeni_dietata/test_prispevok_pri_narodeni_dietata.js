import { readFileSync } from "fs";

import { evaluate } from "../../prispevok_pri_narodeni_dietata.js";
import { loadJsonSync, assert, deepEqual } from "../../util.js";

const RESOURCES = "tests/prispevok_pri_narodeni_dietata/resources";
const date = new Date("2024-01-01T00:00:00Z");

const client1 = loadJsonSync(`${RESOURCES}/client_1.json`);
const result1 = evaluate(client1, date);
assert(deepEqual(result1, { isEntitled: false, customData: {} }));

const client2 = loadJsonSync(`${RESOURCES}/client_2.json`);
const result2 = evaluate(client2, date);
assert(deepEqual(result2, { isEntitled: true, customData: { amount: 829.86 } }));

const client3 = loadJsonSync(`${RESOURCES}/client_3.json`);
const result3 = evaluate(client3, date);
assert(deepEqual(result3, { isEntitled: true, customData: { amount: 151.37 } }));

console.log("OK")