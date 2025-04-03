#!/usr/bin/env bash

set -euxo pipefail

cat <<'EOF' >> ~/.zshrc
eval "$(pnpm completion zsh)"
EOF

sed -i ~/.zshrc -e 's/^ZSH_THEME=.*/ZSH_THEME="refined"/'

pnpm install
