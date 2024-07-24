import { evaluate } from "../../prispevky/prispevok_na_starostlivost.js";
import { loadJsonSync, assert, deepEqual } from "../../test_util.js";

const RESOURCES = "tests/prispevok_na_starostlivost/resources";
const date = new Date("2024-01-01T00:00:00Z");

const client1 = loadJsonSync(`${RESOURCES}/client_1.json`);
const result1 = evaluate(client1, date);
assert(deepEqual(result1, { isEntitled: false, customData: {} }));

const client2 = loadJsonSync(`${RESOURCES}/client_2.json`);
const result2 = evaluate(client2, date);
assert(deepEqual(result2, { isEntitled: true, customData: { numberOfKids: 1, amountPerKid: 280, totalAmount: 280 } }));

const client3 = loadJsonSync(`${RESOURCES}/client_3.json`);
const result3 = evaluate(client3, date);
assert(deepEqual(result3, { isEntitled: true, customData: { numberOfKids: 1, amountPerKid: 280, totalAmount: 280 } }));

const client4 = loadJsonSync(`${RESOURCES}/client_4.json`);
const result4 = evaluate(client4, date);
assert(deepEqual(result4, { isEntitled: true, customData: { numberOfKids: 2, amountPerKid: 280, totalAmount: 560 } }));

const client5 = loadJsonSync(`${RESOURCES}/client_5.json`);
const result5 = evaluate(client5, date);
assert(deepEqual(result5, { isEntitled: true, customData: { numberOfKids: 1, amountPerKid: 280, totalAmount: 280 } }));

console.log("OK");
