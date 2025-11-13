# 🚀 Deploy Backend to Render

## Environment Variables Required

Add these in Render's Environment tab:

```
PORT=3000
MERCADOPAGO_ACCESS_TOKEN=APP_USR-82134636170200-111220-e7441692c9ac573863ea994d69cb77d2-679745158
```

## Build Command
```
npm install
```

## Start Command
```
npm start
```

## Notes
- The server will automatically detect the PORT from Render
- Make sure to update the frontend to use the Render URL instead of localhost
