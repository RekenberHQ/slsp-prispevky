export function getOtherMembersOfTheHousehold(payload) {
  const members = [];

  if (payload.vy_pocet_dalsich_clenov_domacnosti >= 1) {
    members.push({
      name: [payload.clen_v_domacnosti_meno, payload.clen_v_domacnosti_stredne_meno, payload.clen_v_domacnosti_priezvisko].join(" "),
      birth_date: payload.clen_v_domacnosti_datum_narodenia,
      gender: payload.clen_v_domacnosti_pohlavie,
      typ_pobytu: payload.clen_v_domacnosti_typ_pobytu,
      address: payload.clen_v_domacnosti_adresa_sa_zhoduje
        ? payload.vy_ulice + " " + payload.vy_cislo + ", " + payload.vy_mesto + ", " + payload.vy_psc
        : payload.clen_v_domacnosti_ulice + " " + payload.clen_v_domacnosti_cislo_domu + ", " + payload.clen_v_domacnosti_mesto + ", " + payload.clen_v_domacnosti_psc,
      zdravotna_situacia: payload.clen_v_domacnosti_zdravotna_situacia,
      vo_vasej_starostlivosti: payload.clen_v_domacnosti_vo_vasej_starostlivosti,
      poberate_prispevok_na_opatrovanie: payload.clen_v_domacnosti_poberate_prispevok_na_opatrovanie,
      prispevok_na_osobnu_asistenciu: payload.clen_v_domacnosti_prispevok_na_osobnu_asistenciu,
      zvysenie_dochodku_pre_bezvladnost: payload.clen_v_domacnosti_zvysenie_dochodku_pre_bezvladnost,
      zvysenie_dochodku_pre_bezvladnost_vyska: payload.clen_v_domacnosti_zvysenie_dochodku_pre_bezvladnost_vyska,
    });
  }

  return members;
}
