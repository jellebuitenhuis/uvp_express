# UVP Express
Deze applicatie is een wrapper om de UVP-API van de SBN.

De applicatie maakt gebruikt van proxies om de UVP-API te benaderen.
Dit gebeurt om te zorgen dat de API benaderbaar is vanuit alle browsers.
De UVP-API maakt gebruik van XML-RPC.
Deze applicatie ontvangt JSON en gebruikt een XML-RPC-client om de JSON de transformeren naar XML, waar de UVP-API mee om kan gaan.

Voorbeelden van de te ontvangen JSON en de te versturen XML zijn te vinden in
[request.json](./request.json), [rpc.xml](./rpc.xml) en [survivalrun.xml](./survivalrun.xml).
Schemas voor de JSON en XML zijn te vinden in [schema.json](./request_schema.json), [rpc.xsd](./rpc.xsd) en [survivalrun.xsd](./survivalrun.xsd).