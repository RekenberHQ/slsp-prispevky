export function getChildren(payload) {
  const children = [];

  if (payload.vy_pocet_deti >= 1) {
    children.push({
      name: [payload.dieta_meno, payload.dieta_stredne_meno, payload.dieta_priezvisko].join(" "),
      birth_date: payload.dieta_datum_narodenia,
      gender: payload.dieta_pohlavie,
      typ_pobytu: payload.dieta_typ_pobytu,
      address: payload.dieta_adresa_dietata_sa_zhoduje
        ? payload.vy_ulice + " " + payload.vy_cislo + ", " + payload.vy_mesto + ", " + payload.vy_psc
        : payload.dieta_ulice + " " + payload.dieta_cislo + ", " + payload.dieta_mesto + ", " + payload.dieta_psc,
      stavOpatery: payload.dieta_stav_opatery,
      dieta_zdravotna_situacia: payload.dieta_zdravotna_situacia,
      dieta_prispevok_na_starostlivost: payload.dieta_prispevok_na_starostlivost,
      dieta_poberate_matersku_davku: payload.dieta_poberate_matersku_davku,
      dieta_materska_davka_od: payload.dieta_materska_davka_od,
      dieta_materska_davka_do: payload.dieta_materska_davka_do,
      dieta_poberate_rodicovsky_prispevok: payload.dieta_poberate_rodicovsky_prispevok,
      dieta_navstevuje_skolu: payload.dieta_navstevuje_skolu,
      dieta_ostatne_informacie: payload.dieta_ostatne_informacie,
    });
  }

  if (payload.vy_pocet_deti >= 2) {
    children.push({
      name: [payload.dieta_meno1, payload.dieta_stredne_meno1, payload.dieta_priezvisko1].join(" "),
      birth_date: payload.dieta_datum_narodenia1,
      gender: payload.dieta_pohlavie1,
      typ_pobytu: payload.dieta_typ_pobytu1,
      address: payload.dieta_adresa_dietata_sa_zhoduje1
        ? payload.vy_ulice + " " + payload.vy_cislo + ", " + payload.vy_mesto + ", " + payload.vy_psc
        : payload.dieta_ulice1 + " " + payload.dieta_cislo1 + ", " + payload.dieta_mesto1 + ", " + payload.dieta_psc1,
      stavOpatery: payload.dieta_stav_opatery1,
      dieta_zdravotna_situacia: payload.dieta_zdravotna_situacia1,
      dieta_prispevok_na_starostlivost: payload.dieta_prispevok_na_starostlivost1,
      dieta_poberate_matersku_davku: payload.dieta_poberate_matersku_davku1,
      dieta_materska_davka_od: payload.dieta_materska_davka_od1,
      dieta_materska_davka_do: payload.dieta_materska_davka_do1,
      dieta_poberate_rodicovsky_prispevok: payload.dieta_poberate_rodicovsky_prispevok1,
      dieta_navstevuje_skolu: payload.dieta_navstevuje_skolu1,
      dieta_ostatne_informacie: payload.dieta_ostatne_informacie1,
    });
  }

  if (payload.vy_pocet_deti >= 3) {
    children.push({
      name: [payload.dieta_meno2, payload.dieta_stredne_meno2, payload.dieta_priezvisko2].join(" "),
      birth_date: payload.dieta_datum_narodenia2,
      gender: payload.dieta_pohlavie2,
      typ_pobytu: payload.dieta_typ_pobytu2,
      address: payload.dieta_adresa_dietata_sa_zhoduje2
        ? payload.vy_ulice + " " + payload.vy_cislo + ", " + payload.vy_mesto + ", " + payload.vy_psc
        : payload.dieta_ulice2 + " " + payload.dieta_cislo2 + ", " + payload.dieta_mesto2 + ", " + payload.dieta_psc2,
      stavOpatery: payload.dieta_stav_opatery2,
      dieta_zdravotna_situacia: payload.dieta_zdravotna_situacia2,
      dieta_prispevok_na_starostlivost: payload.dieta_prispevok_na_starostlivost2,
      dieta_poberate_matersku_davku: payload.dieta_poberate_matersku_davku2,
      dieta_materska_davka_od: payload.dieta_materska_davka_od2,
      dieta_materska_davka_do: payload.dieta_materska_davka_do2,
      dieta_poberate_rodicovsky_prispevok: payload.dieta_poberate_rodicovsky_prispevok2,
      dieta_navstevuje_skolu: payload.dieta_navstevuje_skolu2,
      dieta_ostatne_informacie: payload.dieta_ostatne_informacie2,
    });
  }

  if (payload.vy_pocet_deti >= 4) {
    children.push({
      name: [payload.dieta_meno3, payload.dieta_stredne_meno3, payload.dieta_priezvisko3].join(" "),
      birth_date: payload.dieta_datum_narodenia3,
      gender: payload.dieta_pohlavie3,
      typ_pobytu: payload.dieta_typ_pobytu3,
      address: payload.dieta_adresa_dietata_sa_zhoduje3
        ? payload.vy_ulice + " " + payload.vy_cislo + ", " + payload.vy_mesto + ", " + payload.vy_psc
        : payload.dieta_ulice3 + " " + payload.dieta_cislo3 + ", " + payload.dieta_mesto3 + ", " + payload.dieta_psc3,
      stavOpatery: payload.dieta_stav_opatery3,
      dieta_zdravotna_situacia: payload.dieta_zdravotna_situacia3,
      dieta_prispevok_na_starostlivost: payload.dieta_prispevok_na_starostlivost3,
      dieta_poberate_matersku_davku: payload.dieta_poberate_matersku_davku3,
      dieta_materska_davka_od: payload.dieta_materska_davka_od3,
      dieta_materska_davka_do: payload.dieta_materska_davka_do3,
      dieta_poberate_rodicovsky_prispevok: payload.dieta_poberate_rodicovsky_prispevok3,
      dieta_navstevuje_skolu: payload.dieta_navstevuje_skole3,
      dieta_ostatne_informacie: payload.dieta_ostatne_informacie3,
    });
  }

  if (payload.vy_pocet_deti >= 5) {
    children.push({
      name: [payload.dieta_meno4, payload.dieta_stredne_meno4, payload.dieta_priezvisko4].join(" "),
      birth_date: payload.dieta_datum_narodenia4,
      gender: payload.dieta_pohlavie4,
      typ_pobytu: payload.dieta_typ_pobytu4,
      address: payload.dieta_adresa_dietata_sa_zhoduje4
        ? payload.vy_ulice + " " + payload.vy_cislo + ", " + payload.vy_mesto + ", " + payload.vy_psc
        : payload.dieta_ulice4 + " " + payload.dieta_cislo4 + ", " + payload.dieta_mesto4 + ", " + payload.dieta_psc4,
      stavOpatery: payload.dieta_stav_opatery4,
      dieta_zdravotna_situacia: payload.dieta_zdravotna_situacia4,
      dieta_prispevok_na_starostlivost: payload.dieta_prispevok_na_starostlivost4,
      dieta_poberate_matersku_davku: payload.dieta_poberate_matersku_davku4,
      dieta_materska_davka_od: payload.dieta_materska_davka_od4,
      dieta_materska_davka_do: payload.dieta_materska_davka_do4,
      dieta_poberate_rodicovsky_prispevok: payload.dieta_poberate_rodicovsky_prispevok4,
      dieta_navstevuje_skolu: payload.dieta_navstevuje_skolu4,
      dieta_ostatne_informacie: payload.dieta_ostatne_informaci4,
    });
  }

  return children;
}
