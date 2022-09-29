# UVP Express
Deze applicatie is een wrapper om de UVP-API van de SBN.

De applicatie maakt gebruikt van proxies om de UVP-API te benaderen.
Dit gebeurt om te zorgen dat de API benaderbaar is vanuit alle browsers.
De UVP-API maakt gebruik van XML-RPC.
Deze applicatie ontvangt JSON en gebruikt een XML-RPC-client om de JSON de transformeren naar XML, waar de UVP-API mee om kan gaan.

Voorbeelden van de te ontvangen JSON en de te versturen XML zijn te vinden in repsectievelijk
[test.json](./test.json) en [test.xml](./test.xml).