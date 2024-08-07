import { evaluate } from "../../prispevky/prispevok_na_opatrovanie.js";
import { loadJsonSync, assert, deepEqual } from "../../test_util.js";

const RESOURCES = "tests/prispevok_na_opatrovanie/resources";
const date = new Date("2024-01-01T00:00:00Z");

const client1 = loadJsonSync(`${RESOURCES}/client_1.json`);
const result1 = evaluate(client1, date);
assert(deepEqual(result1, { isEntitled: true, customData: { amount: 615.5, numberOfPersons: 1 } }));

const client2 = loadJsonSync(`${RESOURCES}/client_2.json`);
const result2 = evaluate(client2, date);
assert(deepEqual(result2, { isEntitled: true, customData: { amount: 515.5, numberOfPersons: 1 } }));

const client3 = loadJsonSync(`${RESOURCES}/client_3.json`);
const result3 = evaluate(client3, date);
assert(deepEqual(result3, { isEntitled: false, customData: {} }));

const client4 = loadJsonSync(`${RESOURCES}/client_4.json`);
const result4 = evaluate(client4, date);
assert(deepEqual(result4, { isEntitled: false, customData: {} }));

console.log("OK");
