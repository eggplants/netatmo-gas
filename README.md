# netatmo-gas

## Setup

Open Dev Container and then:

```bash
pnpm auth
pnpm create-sheet
# Created new document: https://drive.google.com/open?id=***
# Created new script: https://script.google.com/d/***
# └─ appsscript.json
pnpm build
pnpm push
```

Open created script and execute to setup `config` sheet.

- `clientId`: Netatmo App Client ID
- `clientSecret`: Netatmo App Client Secret
- `slackWebhookUrl`: Slack Incoming Webhook URL

And execute again to test notification.
