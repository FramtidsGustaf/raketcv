# RAKETCV

RaketCV är ett verktyg för att förenkla jobbsöksprocessen.

Skapa ditt cv och låt sedan Open AI skriva ett första utkast till ett personligt brev.

## Så funkar det

- Klona detta repo

- Installera dependencies genom vara i repots root och kör

```bash
npm run installera
```

Detta kan ta några sekunder

- Skapa en apinyckel hos [OpenAI](https://openai.com/) (Koden är skriven för att använda gpt-4o-mini)

- Gå in och skapa en fil i apimappen och skapa en fil som heter **.env**

- I .env-filen skapar du en environmentvariabel som heter **OPEN_API_KEY**

- Klistra in din apinyckel från OpenAI

EX: 

```
OPEN_API_KEY=Klistra in din hemliga nyckel här
```

- Starta appen genom vara i repots root och kör

```bash
npm run dev
```

### OBS!
Det finns en risk att processen inte dör för att du trycker **ctrl+c** i terminalen

Detta kan göra att frontend öppnar på en ny port vilket kommer göra att du inte kommer åt dina sparade cv och personligabrev.

Du kan döda alla processer genom att skriva

```bash
sudo killall node
```

Detta kommer dock att döda alla node processer
