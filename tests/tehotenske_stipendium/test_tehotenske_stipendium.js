import { evaluate } from "../../prispevky/tehotenske_stipendium.js";
import { loadJsonSync, assert, deepEqual } from "../../test_util.js";

const RESOURCES = "tests/tehotenske_stipendium/resources";
const date = new Date("2024-01-01T00:00:00Z");

const client1 = loadJsonSync(`${RESOURCES}/client_1.json`);
const result1 = evaluate(client1, date);
assert(deepEqual(result1, { isEntitled: true, customData: { amount: 200 } }));

const client2 = loadJsonSync(`${RESOURCES}/client_2.json`);
const result2 = evaluate(client2, date);
assert(deepEqual(result2, { isEntitled: false, customData: {} }));

console.log("OK");