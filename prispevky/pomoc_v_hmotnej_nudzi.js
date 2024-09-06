import {
  STAV_OPATERY_VO_VASEJ_OPATERE,
  STAV_OPATERY_V_OPATERE_OBOCH_RODICOV,
  DIETA_SKOLSKA_DOCHADZKA_NENAVSTEVUJE_SKOLU,
  DIETA_OSTATNE_NEMA_ZDRAVOTNE_POISTENIE,
  DIETA_OSTATNE_V_SPECIALNOM_ZARIADENI,
  DIETA_OSTATNE_VO_VYKONE_VAZBY,
} from "../constants.js";
import { getChildren } from "../get_children.js";
import { monthDiff, parseIsoDate } from "../app_util.js";
function coalesce(v) {
  return v || 0;
}
export function evaluate(payload, date) {
  const children = getChildren(payload);

  const studuje = payload.vy_studujete_dennou_formou;
  var detiVOpatere = children.filter((d) => d.stavOpatery == STAV_OPATERY_VO_VASEJ_OPATERE || d.stavOpatery == STAV_OPATERY_V_OPATERE_OBOCH_RODICOV);
  var nezaopatreneDeti = detiVOpatere.filter(
    (d) =>
      monthDiff(parseIsoDate(d.birth_date), new Date()) <= 18 * 12 ||
      (monthDiff(parseIsoDate(d.birth_date), new Date()) <= 25 * 12 && d.dieta_navstevuje_skolu !== DIETA_SKOLSKA_DOCHADZKA_NENAVSTEVUJE_SKOLU)
  );
  var poberaVylucovaciPrispevok = nezaopatreneDeti.filter((d) => d.dieta_poberate_rodicovsky_prispevok || d.dieta_prispevok_na_starostlivost).length > 0;

  var zivotneMinimum = 273.99;
  if (payload.vy_zijete_s_manzelom_v_domacnosti === "Áno") {
    zivotneMinimum += 191.14;
  }

  zivotneMinimum += nezaopatreneDeti.length * 125.11;

  const prijemDomacnosti =
    coalesce(payload.vy_prijmy_zamestnanie_mesacny_prijem) +
    coalesce(payload.vy_prijmy_prijem_z_podnikania) / 12 +
    coalesce(payload.vy_prijmy_vyse_prijem_z_firem) / 12 +
    coalesce(payload.vy_prijmy_starobny_duchod_vyse) +
    coalesce(payload.vy_prijmy_predcasny_starobny_duchod) +
    coalesce(payload.vy_prijmy_invalidny_duchod_vyse) +
    coalesce(payload.vy_prijmy_invalidny_dochodok_z_mladosti_vyse) +
    coalesce(payload.vy_prijmy_vdovecky_dochodok_vyse) +
    coalesce(payload.vy_prijmy_vysluhovy_dochodok_vyska) +
    coalesce(payload.vy_prijmy_sirotsky_dochodok_vyska) +
    coalesce(payload.vy_prijmy_poberate_podporu_v_nezamestnanosti_vyska) +
    coalesce(payload.partner_prijmy_zamestnanie_mesacny_prijem) +
    coalesce(payload.partner_prijmy_prijem_z_podnikania) / 12 +
    coalesce(payload.partner_prijmy_vyse_prijem_z_firem) / 12 +
    coalesce(payload.partner_prijmy_starobny_duchod_vyse) +
    coalesce(payload.partner_prijmy_predcasny_starobny_duchod) +
    coalesce(payload.partner_prijmy_invalidny_duchod_vyse) +
    coalesce(payload.partner_prijmy_invalidny_dochodok_z_mladosti_vyse) +
    coalesce(payload.partner_prijmy_vdovecky_dochodok_vyse) +
    coalesce(payload.partner_prijmy_vysluhovy_dochodok_vyska) +
    coalesce(payload.partner_prijmy_sirotsky_dochodok_vyska) +
    coalesce(payload.partner_prijmy_poberate_podporu_v_nezamestnanosti_vyska);

  if (prijemDomacnosti < zivotneMinimum && !studuje && !poberaVylucovaciPrispevok) {
    var davkaVHmotnejNudzi = 0;
    if (payload.vy_zijete_s_manzelom_v_domacnosti === "Áno") {
      if (nezaopatreneDeti.length === 0) {
        davkaVHmotnejNudzi += 147.5;
      } else if (nezaopatreneDeti.length <= 4) {
        davkaVHmotnejNudzi += 220.7;
      } else if (nezaopatreneDeti.length > 4) {
        davkaVHmotnejNudzi += 297.5;
      }
    } else {
      if (nezaopatreneDeti.length === 0) {
        davkaVHmotnejNudzi += 84.9;
      } else if (nezaopatreneDeti.length <= 4) {
        davkaVHmotnejNudzi += 161.4;
      } else if (nezaopatreneDeti.length > 4) {
        davkaVHmotnejNudzi += 235.7;
      }
    }

    var prispevokNaNezaopatreneDieta = nezaopatreneDeti.length * 23.7;

    var aktivacnyPrispevok = 0;
    if (payload.vy_prijmy_ste_zamestnana) {
      aktivacnyPrispevok += 140.8;
    } else {
      aktivacnyPrispevok += 70.4;
    }

    var pocetClenovVDomacnosti = 1;
    if (payload.vy_zijete_s_manzelom_v_domacnosti === "Áno") {
      pocetClenovVDomacnosti += 1;
    }
    pocetClenovVDomacnosti += detiVOpatere.length;

    // prispevok na byvanie
    var prispevokNaByvanie = 0;
    if (pocetClenovVDomacnosti == 1) {
      prispevokNaByvanie += 95.2;
    } else if (pocetClenovVDomacnosti == 2) {
      prispevokNaByvanie += 161.6;
    } else if (pocetClenovVDomacnosti == 3) {
      prispevokNaByvanie += 205.1;
    } else if (pocetClenovVDomacnosti == 4) {
      prispevokNaByvanie += 248.6;
    } else if (pocetClenovVDomacnosti > 4) {
      prispevokNaByvanie += 291.9;
    }

    const vyskaPrispevku = davkaVHmotnejNudzi + prispevokNaNezaopatreneDieta + aktivacnyPrispevok + prispevokNaByvanie - prijemDomacnosti;

    return {
      isEntitled: true,
      customData: {
        amount: parseFloat(vyskaPrispevku.toFixed(2)),
        davkaVHmotnejNudzi: davkaVHmotnejNudzi,
        prispevokNaNezaopatreneDieta: prispevokNaNezaopatreneDieta,
        aktivacnyPrispevok: aktivacnyPrispevok,
        prispevokNaByvanie: prispevokNaByvanie,
      },
    };
  } else {
    return { isEntitled: false, customData: {} };
  }
}
