#!/usr/bin/env bash

set -euxo pipefail

pnpm completion zsh >> ~/.zshrc

sed -i ~/.zshrc -e 's/^ZSH_THEME=.*/ZSH_THEME="refined"/'

pnpm install
