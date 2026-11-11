HEAT CONTROL – DEMO 0.2.0
==========================

Co demo umí
-----------
- Přehled kotle, akumulační nádrže a radiátorového okruhu.
- Animované schéma proudění tepla.
- Simulované teploty, které se průběžně mírně mění.
- Grafy za 6, 12 a 24 hodin.
- Nastavování tří ukázkových požadovaných hodnot.
- Přehled zařízení a diagnostiky.
- Rozhraní přizpůsobené iPhonu.
- Přihlašovací obrazovka při každém otevření stránky.
- Vzorový přístupový kód: 1234.
- Ruční odhlášení a opětovné přihlášení po návratu z pozadí.

DŮLEŽITÉ
--------
Jde o demonstrační aplikaci. Přihlášení s kódem 1234 je pouze ukázka na straně prohlížeče;
nepředstavuje skutečné zabezpečení a heslo lze zjistit ze zdrojových souborů.
Nepoužívej zde skutečné heslo ani citlivá data. Aplikace nečte skutečnou SQLite databázi, neposílá příkazy
na Raspberry Pi/ESP a nijak neovládá kotel. Všechna data jsou simulovaná.

INSTALACE NA IPHONE – DOPORUČENÁ CESTA PŘES HTTPS
-------------------------------------------------
Pro instalaci jako webové aplikace je potřeba aplikaci zpřístupnit přes HTTPS.
Nejjednodušší bez Macu je GitHub Pages:

1. Na Windows rozbal ZIP.
2. Přihlas se na https://github.com/ nebo si vytvoř účet.
3. Vytvoř nový veřejný repository, např. heat-control-demo.
4. Nahraj do něj OBSAH složky heat_control_demo (index.html, app.js,
   style.css, manifest.webmanifest, sw.js a obě ikony).
5. V repository otevři Settings > Pages.
6. V části Build and deployment zvol Deploy from a branch.
7. Vyber branch main a složku /(root), potvrď Save.
8. Počkej, až GitHub Pages zveřejní adresu ve tvaru
   https://TVUJ-UCET.github.io/heat-control-demo/
9. Otevři tuto adresu přímo na iPhonu v Safari.
10. Klepni na Sdílet (čtvereček se šipkou nahoru) > Přidat na plochu.
11. Potvrď Přidat. Ikona HEAT CONTROL se objeví na ploše.
12. Spusť aplikaci z ikony. Po prvním načtení bude základní obsah dostupný
    i offline díky service workeru.

POZNÁMKA K SOUKROMÍ
-------------------
Pokud použiješ veřejné GitHub Pages, demo bude veřejně dostupné každému,
kdo zná adresu. Neobsahuje žádná skutečná data ani přihlašovací údaje.
Přihlašovací obrazovka sama o sobě nezabezpečuje veřejně hostovanou aplikaci ani její data.
Pro pozdější napojení na domácí systém zvolíme skutečné ověření na API a privátní přístup přes Tailscale
a API na Raspberry Pi; tajné klíče se nikdy nevkládají do front-endu.

LOKÁLNÍ NÁHLED NA WINDOWS
-------------------------
Pokud máš Python:
1. Otevři PowerShell ve složce s index.html.
2. Spusť:  py -m http.server 8000
3. Na počítači otevři: http://localhost:8000
To slouží pro rychlý náhled. Pro instalaci do iPhonu použij HTTPS postup výše.

DALŠÍ KROK
----------
Až demo vyzkoušíš, upravíme schéma podle skutečného zapojení a napojíme data
na bezpečné API na Raspberry Pi 4. Nejdřív bude potřeba struktura SQLite
(.schema), kterou jsme si domluvili.
