#!/bin/bash

# Script de deploy alternativo para GitHub Pages usando SSH
# Uso: ./deploy-ghpages.sh

set -e

echo "🔨 Building application..."
npm run build:ghpages

if [ ! -d "dist" ]; then
  echo "❌ Build directory not found!"
  exit 1
fi

echo "📦 Preparing deployment..."

# Salvar remote atual
CURRENT_REMOTE=$(git remote get-url origin)
echo "Current remote: $CURRENT_REMOTE"

# Verificar se já está na branch gh-pages
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

# Criar branch gh-pages se não existir
if ! git show-ref --verify --quiet refs/heads/gh-pages; then
  echo "Creating gh-pages branch..."
  git checkout --orphan gh-pages
  git rm -rf . 2>/dev/null || true
else
  echo "Switching to gh-pages branch..."
  git checkout gh-pages
  git rm -rf . 2>/dev/null || true
fi

# Copiar arquivos do build
echo "Copying build files..."
cp -r dist/* .
echo "" > .nojekyll

# Adicionar e commitar
git add .
git commit -m "Deploy: $(date +%Y-%m-%d\ %H:%M:%S)" || echo "No changes to commit"

# Tentar usar SSH se o remote for HTTPS
if [[ "$CURRENT_REMOTE" == https://* ]]; then
  SSH_REMOTE=$(echo "$CURRENT_REMOTE" | sed 's|https://github.com/|git@github.com:|')
  echo "Temporarily switching to SSH: $SSH_REMOTE"
  git remote set-url origin "$SSH_REMOTE"
fi

echo "🚀 Pushing to GitHub Pages..."
git push origin gh-pages --force

# Restaurar remote original
if [[ "$CURRENT_REMOTE" == https://* ]]; then
  echo "Restoring original remote..."
  git remote set-url origin "$CURRENT_REMOTE"
fi

# Voltar para a branch original
if [ "$CURRENT_BRANCH" != "gh-pages" ]; then
  git checkout "$CURRENT_BRANCH" 2>/dev/null || git checkout main || git checkout master
fi

echo "✅ Deploy completed successfully!"

