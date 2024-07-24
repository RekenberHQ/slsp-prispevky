.PHONY: all

all: test_prispevok_pri_narodeni_dietata test_rodicovsky_prispevok test_pridavok_na_dieta test_prispevok_na_viac_sucasne_narodenych_deti test_prispevok_na_starostlivost test_tehotensky_prispevok test_tehotenske_stipendium test_materska_dovolenka test_pomoc_v_hmotnej_nudzi

test_prispevok_pri_narodeni_dietata:
	node tests/prispevok_pri_narodeni_dietata/test_prispevok_pri_narodeni_dietata.js

test_rodicovsky_prispevok:
	node tests/rodicovsky_prispevok/test_rodicovsky_prispevok.js

test_pridavok_na_dieta:
	node tests/pridavok_na_dieta/test_pridavok_na_dieta.js

test_prispevok_na_viac_sucasne_narodenych_deti:
	node tests/prispevok_na_viac_sucasne_narodenych_deti/test_prispevok_na_viac_sucasne_narodenych_deti.js

test_prispevok_na_starostlivost:
	node tests/prispevok_na_starostlivost/test_prispevok_na_starostlivost.js

test_tehotensky_prispevok:
	node tests/tehotensky_prispevok/test_tehotensky_prispevok.js

test_tehotenske_stipendium:
	node tests/tehotenske_stipendium/test_tehotenske_stipendium.js

test_materska_dovolenka:
	node tests/materska_dovolenka/test_materska_dovolenka.js

test_pomoc_v_hmotnej_nudzi:
	node tests/pomoc_v_hmotnej_nudzi/test_pomoc_v_hmotnej_nudzi.js
