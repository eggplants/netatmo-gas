# netatmo-gas

![Screenshot](https://github.com/user-attachments/assets/148bae3a-3503-4385-bee4-3b623f42f140)

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

# pull existing script
cat <<'JSON'> .clasp.json
{
  "scriptId": "<existing script ID>"
}
JSON
pnpm clasp pull
```

Open created script and execute to setup `config` sheet.

- `clientId`: Netatmo App Client ID
- `clientSecret`: Netatmo App Client Secret
- `slackWebhookUrl`: Slack Incoming Webhook URL

And execute again to test notification.
