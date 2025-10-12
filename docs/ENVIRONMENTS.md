# 🌍 Configuração de Ambientes - Expo

Este projeto suporta dois ambientes: **Desenvolvimento** e **Produção** usando Expo.

## 📋 Ambientes Disponíveis

### 🔧 Desenvolvimento
- **API URL:** `http://localhost:3000`
- **Debug:** Ativado
- **Logs:** Detalhados
- **Build:** Development Client

### 🚀 Produção
- **API URL:** `https://api-gb-vowe.onrender.com`
- **Debug:** Desativado
- **Logs:** Apenas erros
- **Build:** Production

## 🛠️ Como Usar

### Scripts NPM Disponíveis

```bash
# Iniciar em desenvolvimento
npm run start:dev

# Iniciar em produção
npm run start:prod

# Builds com EAS
npm run build:dev      # Build de desenvolvimento
npm run build:preview  # Build de preview
npm run build:prod     # Build de produção
```

### Comandos Manuais

```bash
# Alternar ambiente
npm run env:dev        # Desenvolvimento
npm run env:prod       # Produção

# Iniciar com variável de ambiente
EXPO_PUBLIC_ENVIRONMENT=development expo start
EXPO_PUBLIC_ENVIRONMENT=production expo start
```

## 📁 Estrutura de Arquivos

```
config/
├── index.ts          # Configuração dinâmica
├── env.dev.ts        # Configurações de desenvolvimento
└── env.prod.ts       # Configurações de produção

scripts/
└── switch-env.js     # Script para alternar ambientes
```

## 🔄 Como Funciona

1. O sistema detecta automaticamente o ambiente baseado em:
   - Variável `__DEV__` do React Native
   - Variável `EXPO_PUBLIC_ENVIRONMENT`
   - Padrão: desenvolvimento

2. A configuração é carregada dinamicamente:
   - **Desenvolvimento:** `config/env.dev.ts`
   - **Produção:** `config/env.prod.ts`

3. O axios é configurado automaticamente com a URL correta

## 🎯 Exemplos de Uso

### Desenvolvimento Local
```bash
npm run start:dev
# Usa: http://localhost:3000
```

### Produção
```bash
npm run start:prod
# Usa: https://api-gb-vowe.onrender.com
```

## 🔍 Verificação

Para verificar qual ambiente está ativo, observe os logs no console:

```
🔧 Ambiente: development
🌐 API URL: http://localhost:3000
🐛 Debug: true
```

## ⚠️ Importante

- Sempre teste em ambos os ambientes antes de fazer deploy
- As configurações de produção são mais restritivas
- O ambiente de desenvolvimento permite mais logs e debug
