## Store Management

1. Instalar dependencias
```
npm install
```
2. Crear .env.development
3. Añadir las variables de entorno

```
## FIREBASE CONFIG
REACT_APP_FIREBASE_API_KEY="XXX"
REACT_APP_FIREBASE_AUTH_DOMAIN="XXX"
REACT_APP_FIREBASE_DATABASE_URL="XXX"
REACT_APP_FIREBASE_PROJECT_ID="XXX"
REACT_APP_FIREBASE_STORAGE_BUCKET="XXX"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="XXX"
REACT_APP_FIREBASE_APP_ID="XXX",
REACT_APP_FIREBASE_MEASUREMENT_ID="XXX"

## TABLES
REACT_APP_TABLE_INVOICE="XXX"
REACT_APP_TABLE_CLIENT="XXX"
```
4. Ejecutar la app
```
firebase emulators:start 
npm start
```
5. Generar paquete
```
npm run build:dev
```
6. Desplegar en Firebase
```
firebase deploy
```
