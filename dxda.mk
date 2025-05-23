1. Was benötigen wir in ein .env Datei, um eine Verbindung zu einer MongoDB-Datenbank herzustellen?
*
URL
Benutzername
Passwort
Name der Sammlung
2. Eine Mongoose Model Klasse repräsentiert welche der folgenden?
*
Feld
Sammlung
Datenbank
Dokument
3. Was ist der Hauptunterschied zwischen Verschlüsselung und Hashing?
*
Hashing-Algorithmen sind schneller als Verschlüsselungsalgorithmen
Verschlüsselung ist sicherer als Hashing
Hashing kann Salting verwenden, während Verschlüsselung dies nicht kann
Verschlüsselung ist umkehrbar, während Hashing eine nicht umkehrbare Operation ist
4. Welche der folgenden Aussagen sind richtig über MongoDB?
*
Eine Sammlung besteht aus einem oder mehreren Dokumenten
Eine Sammlung ist eine Reihe von Schlüssel/Wert-Paaren
Ein Dokument ist eine Darstellung eines einzelnen Objekts
Unser MongoDB-Server kann mehrere Datenbanken enthalten
5. Welche der folgenden Aussagen erklärt am besten, warum wir Schemas verwenden sollten, wenn wir eine Datenbankstruktur entwerfen?
*
Mit einem Datenbankschema können wir unsere Daten mit Dritten teilen
Schemas helfen sicherzustellen, dass nur gültige und konsistente Daten in der Datenbank gespeichert werden
Schemas härten unsere Datenbank gegen unbefugten Zugriff
Schemas machen den Zugriff auf unsere Daten viel schneller
6. Welche der folgenden Schema-Typen sind in Mongoose sind verfügbar?
*
Array
Boolescher Wert
Puffer
Objekt
Gemischt
ObjectId
7. Die Eigenschaften "required", "min" und "enum" sind Beispiele für was in unserem Mongoose Schema?
*
Plugins
Validatoren
Abfragen
Transaktionen
8. Das Schema beschreibt die Attribute der Eigenschaften, die durch die Anwendung manipuliert werden. Zu diesen Attributen gehören:
*
ob der Wert erforderlich (engl. "required") ist
der Datentyp
ob der Wert eindeutig (engl. "unique") ist
9. Eine ObjectId ist ein spezieller Typ der typischerweise für eindeutige IDs (engl. "unique identifiers") genutzt wird.
*
Wahr
Falsch
10. Eine ObjectId wird typischerweise durch einen "24 Hexadezimal Character String" repräsentiert, bspw. '5e4bad2a0ab24550afceed7a'.
*
Wahr
Falsch
11. Warum könnten wir die Methode Query.prototype.populate() verwenden wollen?
*
um unsere Ergebnisse zu normalisieren
um unser Dokument durch ein anderes Dokument zu ersetzen
es führt eine weitere Abfrage aus, die automatisch alle leeren Felder in unserem Dokument füllt
um einen angegebenen Pfad im Dokument durch ein Dokument aus einer anderen Sammlung zu ersetzen
12. Welche der folgenden Aussagen ist wahr über die Eigenschaft "unique" in unserem Mongoose Schema?
*
es stellt sicher, dass der Wert des angegebenen Feldes einzigartig ist für alle Dokumente in der Sammlung
es stellt sicher, dass der Wert des Feldes nur innerhalb des aktuellen Dokuments einzigartig ist
es kann nur auf String-Felder angewendet werden
es setzt automatisch einen neuen Wert, wenn ein doppelter Wert eingefügt wird
13. Welche der folgenden Methoden sind nützlich bei der Arbeit mit Pagination?
*
Query.prototype.limit(<number>)
Query.prototype.skip(<number>)
Query.prototype.lean()
Query.prototype.populate()
14. Die "timestamps"-Option führt dazu, dass Mongoose die Felder 'createdAt' und 'updatedAt' zum Schema hinzufügt.
*
Wahr
Falsch
15. Was ist der Grund dafür, einen Hashing-Algorithmus auf ein Klartext-Passwort anzuwenden?
*
wir können das gehashte Passwort später während der Authentifizierung entschlüsseln
es fügt eine zusätzliche Sicherheitsebene gegen unbefugten Zugriff hinzu
es erstellt ein Auth-Token für den Benutzer
es verschlüsselt den Datenverkehr zwischen dem Client und dem Server
16. Welche der folgenden Aussagen sind wahr über JSON Web Tokens (JWT)?
*
wir können Daten über den Benutzer im Token speichern
wir können sie zur Autorisierung eines Benutzers verwenden
JWTs können nur über HTTPS gesendet werden
alle Aussagen treffen zu
17. Was ist Teil eines "JWT Token"?
*
Header
Payload
Signature
Secret
18. Der Prozess, sicherzustellen, dass die Daten, die wir vom Benutzer erhalten, sowohl konsistent als auch sicher sind, wird genannt:
*
Sanitization und Normalization
Authentifizierung und Autorisierung
Normalization
Validierung und Sanitization
19. Welcher HTTP-Header wird verwendet, um Cookies vom Server zum Browser des Clients zu senden?
*
Send-Cookie
Save-Cookie
Set-Cookie
Put-Cookie
20. In welcher Hinsicht unterscheidet sich ein Cookie mit dem HttpOnly-Attribut von regulären Cookies?
*
es kann nicht von clientseitigem JavaScript gelesen werden
der Server hat Kontrolle über das Cookie
es kann helfen, sich gegen XSS-Angriffe zu verteidigen
es ist in Schokoladenstückchen-Geschmack erhältlich