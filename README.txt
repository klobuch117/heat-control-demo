HEAT CONTROL – DEMO 0.2.1
==========================

Tato aktualizace obsahuje přihlašovací obrazovku zobrazovanou ihned po spuštění.
Vzorový přístupový kód: 1234.
Verze 0.2.1 je viditelná také v hlavičce aplikace a na stránce Systém.

NASAZENÍ NA GITHUB PAGES – DŮLEŽITÉ
----------------------------------
Tento ZIP má soubory přímo v kořenové složce archivu (bez další podsložky).
1. ZIP rozbal.
2. V GitHub repository otevři kořenovou složku (root).
3. Nahraj VŠECHNY soubory z rozbalené složky a potvrď přepsání souborů:
   index.html, app.js, style.css, sw.js, manifest.webmanifest,
   icon-192.png, icon-512.png, README.txt.
4. Počkej na dokončení GitHub Pages deploymentu.
5. Nejdřív otevři adresu webu přímo v Safari a obnov stránku.
6. Ověř, že je v hlavičce uvedeno DEMO 0.2.1 a že se zobrazí přihlášení.
7. Teprve pak spusť ikonu na ploše. Když stále ukazuje starou verzi,
   aplikaci úplně zavři, v Safari otevři adresu webu znovu a obnov ji.
8. Pokud se pořád načítá stará verze, odstraň ikonu HEAT CONTROL z plochy,
   v Nastavení iPhonu > Safari > Pokročilé > Data stránek smaž data pouze
   pro doménu GitHub Pages daného webu, znovu otevři web v Safari a přidej
   jej na plochu znovu.

FUNKCE PŘIHLÁŠENÍ
-----------------
- Po každém novém spuštění se zobrazí přihlašovací obrazovka.
- PIN: 1234.
- Tlačítko Odhlásit vrátí aplikaci na přihlašovací obrazovku.
- Při přechodu aplikace do pozadí se demo uzamkne.

UPOZORNĚNÍ
----------
PIN je pouze demonstrační kontrola na straně prohlížeče a není skutečným
zabezpečením. Všechny teploty a akční prvky zůstávají simulované. Aplikace
není připojena k Raspberry Pi, SQLite ani skutečným výstupům topení.
