export function evaluate(payload, date) {
  const doloKZvyseniu = payload.byvanie_doslo_k_zvyseniu_vyska != null;
  const mesacnyPrijem = (payload.vy_prijmy_zamestnanie_mesacny_prijem || 0) * 1.4; // potrebujeme odhad hrubeho platu
  const partnerMesacnyPrijem = (payload.partner_prijmy_zamestnanie_mesacny_prijem || 0) * 1.4; // potrebujeme odhad hrubeho platu

  var celyMesacnyPrijem = mesacnyPrijem;
  if (payload.byvanie_hypoteka_s_partnerom == "Ano") {
    celyMesacnyPrijem += partnerMesacnyPrijem;
  }
  if (doloKZvyseniu && celyMesacnyPrijem < 2086) {
    const amount = Math.min(payload.byvanie_doslo_k_zvyseniu_vyska * 0.75, 150);
    return { isEntitled: true, customData: { amount: amount } };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
