import { evaluate } from "../../prispevky/pomoc_v_hmotnej_nudzi.js";
import { loadJsonSync, assert, deepEqual } from "../../test_util.js";

const RESOURCES = "tests/pomoc_v_hmotnej_nudzi/resources";
const date = new Date("2024-01-01T00:00:00Z");

const client1 = loadJsonSync(`${RESOURCES}/client_1.json`);
const result1 = evaluate(client1, date);
assert(
  deepEqual(result1, {
    isEntitled: true,
    customData: { amount: 250.5, davkaVHmotnejNudzi: 84.9, prispevokNaNezaopatreneDieta: 0, aktivacnyPrispevok: 70.4, prispevokNaByvanie: 95.2 },
  })
);

const client2 = loadJsonSync(`${RESOURCES}/client_2.json`);
const result2 = evaluate(client2, date);
assert(deepEqual(result2, { isEntitled: false, customData: {} }));

const client3 = loadJsonSync(`${RESOURCES}/client_3.json`);
const result3 = evaluate(client3, date);
assert(deepEqual(result3, { isEntitled: false, customData: {} }));

const client4 = loadJsonSync(`${RESOURCES}/client_4.json`);
const result4 = evaluate(client4, date);
assert(
  deepEqual(result4, {
    isEntitled: true,
    customData: { amount: 475.97, davkaVHmotnejNudzi: 161.4, prispevokNaNezaopatreneDieta: 47.4, aktivacnyPrispevok: 70.4, prispevokNaByvanie: 205.1 },
  })
);

console.log("OK");
