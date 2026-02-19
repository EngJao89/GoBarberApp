# 💇 GoBarberApp

Aplicativo mobile multiplataforma desenvolvido com React Native e Expo para gerenciamento de agendamentos de serviços de barbearia. O aplicativo permite que usuários e barbeiros gerenciem agendamentos, perfis e histórico de serviços.

## 📋 Índice

- [Descrição do Projeto](#-descrição-do-projeto)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Arquitetura](#-arquitetura)
- [Decisões Técnicas](#-decisões-técnicas)
- [Ambientes](#-ambientes)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Build e Deploy](#-build-e-deploy)

## 🎯 Descrição do Projeto

O **GoBarberApp** é uma aplicação mobile desenvolvida para facilitar o agendamento e gerenciamento de serviços de barbearia. O aplicativo oferece duas interfaces principais:

- **Interface de Usuários**: Permite que clientes façam login, criem conta, visualizem barbeiros disponíveis, agendem serviços e consultem histórico de agendamentos.
- **Interface de Barbeiros**: Permite que barbeiros façam login, criem perfil profissional, gerenciem disponibilidade, visualizem e confirmem agendamentos pendentes.

### Funcionalidades Principais

- ✅ Autenticação de usuários e barbeiros
- ✅ Cadastro e gerenciamento de perfis
- ✅ Listagem de barbeiros e usuários
- ✅ Agendamento de serviços
- ✅ Gerenciamento de disponibilidade (barbeiros)
- ✅ Histórico de agendamentos
- ✅ Confirmação e cancelamento de agendamentos
- ✅ Suporte a múltiplos ambientes (desenvolvimento, produção, local)

## 🛠 Tecnologias

### Core

- **React Native** `0.76.7` - Framework para desenvolvimento mobile
- **Expo** `~52.0.35` - Plataforma e ferramentas para React Native
- **React** `18.3.1` - Biblioteca JavaScript para interfaces
- **TypeScript** `^5.3.3` - Tipagem estática

### Navegação e Roteamento

- **Expo Router** `~4.0.17` - Roteamento baseado em arquivos
- **React Navigation** `^7.0.14` - Navegação nativa
- **React Navigation Bottom Tabs** `^7.2.0` - Navegação por abas

### Formulários e Validação

- **React Hook Form** `^7.54.2` - Gerenciamento de formulários
- **Zod** `^3.24.2` - Validação de schemas
- **@hookform/resolvers** `^4.1.0` - Integração React Hook Form + Zod

### Comunicação com API

- **Axios** `^1.7.9` - Cliente HTTP

### Armazenamento Local

- **@react-native-async-storage/async-storage** `1.23.1` - Armazenamento assíncrono

### UI e Animações

- **React Native Reanimated** `~3.16.1` - Animações performáticas
- **React Native Gesture Handler** `~2.20.2` - Gestos nativos
- **Expo Blur** `~14.0.3` - Efeitos de blur
- **Expo Haptics** `~14.0.1` - Feedback háptico
- **@expo/vector-icons** `^14.0.2` - Ícones vetoriais

### Outras Bibliotecas

- **React Native Safe Area Context** `4.12.0` - Áreas seguras
- **React Native Screens** `~4.4.0` - Otimização de telas
- **@react-native-community/datetimepicker** `8.2.0` - Seletor de data/hora
- **React Native WebView** `13.12.5` - Visualização web

### Ferramentas de Desenvolvimento

- **Jest** `^29.2.1` - Framework de testes
- **Jest Expo** `~52.0.4` - Preset Jest para Expo
- **Commitizen** `^4.3.1` - Commits padronizados

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente ou via npx)
- **Git**

### Para desenvolvimento mobile

- **Android Studio** (para emulador Android)
- **Xcode** (para iOS Simulator - apenas macOS)
- Ou um dispositivo físico com **Expo Go** instalado

### Configuração do Ambiente Android (Opcional)

Se você planeja usar o emulador Android diretamente:

```bash
# Configure as variáveis de ambiente
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd GoBarberApp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

O projeto suporta três ambientes: `development`, `production` e `local`. Por padrão, usa `development`.

Para configurar manualmente:

```bash
# Ambiente de desenvolvimento
npm run env:dev

# Ambiente de produção
npm run env:prod

# Ambiente local (API local)
npm run env:local
```

### 4. Inicie o servidor de desenvolvimento

```bash
# Modo padrão (desenvolvimento)
npm start

# Ou especifique o ambiente
npm run start:dev      # Desenvolvimento
npm run start:prod     # Produção
npm run start:local    # Local (API local)
```

### 5. Execute o aplicativo

Após iniciar o servidor, você terá várias opções:

#### Opção A: Usar Expo Go (Recomendado para testes rápidos)

1. Instale o **Expo Go** no seu dispositivo móvel:
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)
2. Escaneie o QR code exibido no terminal ou navegador
3. O aplicativo será carregado no seu dispositivo

#### Opção B: Emulador Android

```bash
npm run android
```

**Nota**: Certifique-se de que o emulador Android está rodando ou o Expo iniciará um automaticamente.

#### Opção C: iOS Simulator (apenas macOS)

```bash
npm run ios
```

#### Opção D: Navegador Web

```bash
npm run web
```

### 6. Executar testes

```bash
npm test
```

### 7. Verificar código (Lint)

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```text
GoBarberApp/
├── app/                          # Rotas e páginas (Expo Router)
│   ├── (auth)/                   # Grupo de rotas de autenticação
│   │   ├── registeruser/        # Registro de usuário
│   │   ├── registerbarber/      # Registro de barbeiro
│   │   ├── signinbarber/        # Login de barbeiro
│   │   ├── successuser/         # Sucesso no registro de usuário
│   │   └── successbarber/       # Sucesso no registro de barbeiro
│   ├── (dashboard)/              # Grupo de rotas do dashboard
│   │   ├── barberlist/          # Lista de barbeiros
│   │   ├── userlist/            # Lista de usuários
│   │   ├── history-user/        # Histórico do usuário
│   │   ├── history-barber/      # Histórico do barbeiro
│   │   ├── profileuser/[id]      # Perfil do usuário (dinâmico)
│   │   └── profilebarber/[id]   # Perfil do barbeiro (dinâmico)
│   ├── (appointment)/            # Grupo de rotas de agendamentos
│   │   ├── new/                  # Novo agendamento
│   │   ├── successschedule/     # Sucesso no agendamento
│   │   ├── detailsuser/[id]     # Detalhes do agendamento (usuário)
│   │   ├── detailsbarber/[id]   # Detalhes do agendamento (barbeiro)
│   │   └── add-availability/    # Adicionar disponibilidade
│   ├── index.tsx                 # Página inicial (login)
│   └── _layout.tsx               # Layout raiz da aplicação
├── components/                   # Componentes reutilizáveis
│   ├── FormSignInUser.tsx
│   ├── FormSignInBarber.tsx
│   ├── FormRegisterUser.tsx
│   ├── FormRegisterBarber.tsx
│   ├── FormProfileUser.tsx
│   ├── FormProfileBarber.tsx
│   ├── CardUser.tsx
│   ├── CardBarber.tsx
│   ├── NotificationCard.tsx
│   ├── Loading.tsx
│   └── NotFound.tsx
├── config/                       # Configurações de ambiente
│   ├── index.ts                  # Configuração dinâmica
│   ├── env.dev.ts                # Configurações de desenvolvimento
│   ├── env.prod.ts               # Configurações de produção
│   ├── env.local.ts              # Configurações locais
│   └── force-local.ts            # Forçar ambiente local
├── constants/                    # Constantes da aplicação
│   └── Colors.ts                 # Paleta de cores
├── hooks/                        # Custom hooks
│   ├── useColorScheme.ts
│   ├── useColorScheme.web.ts
│   └── useThemeColor.ts
├── lib/                          # Bibliotecas e utilitários
│   └── axios.ts                  # Configuração do cliente HTTP
├── services/                     # Serviços de API
│   └── schedulingService.ts      # Serviço de agendamentos
├── scripts/                      # Scripts auxiliares
│   ├── switch-env.js             # Alternar ambientes
│   ├── start-local-server.sh     # Iniciar servidor local
│   ├── reset-project.js          # Resetar projeto
│   └── start-emulator-safe.sh    # Iniciar emulador com segurança
├── assets/                       # Recursos estáticos
│   └── images/                   # Imagens e ícones
├── docs/                         # Documentação adicional
│   └── ENVIRONMENTS.md           # Documentação de ambientes
├── app.config.js                 # Configuração do Expo
├── app.json                      # Configuração alternativa do Expo
├── eas.json                      # Configuração do EAS Build
├── package.json                  # Dependências e scripts
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Este arquivo
```

## 🏗 Arquitetura

### Arquitetura Geral

O projeto segue uma arquitetura modular baseada em **Expo Router** com roteamento baseado em arquivos, facilitando a organização e navegação da aplicação.

```text
┌─────────────────────────────────────────┐
│         Expo Router (File-based)       │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │  (auth)  │  │(dashboard)│  │(appt)│ │
│  └──────────┘  └──────────┘  └──────┘ │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Components Layer                 │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │  Forms   │  │  Cards   │  │  UI  │ │
│  └──────────┘  └──────────┘  └──────┘ │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Services Layer                  │
│  ┌──────────────────────────────────┐  │
│  │    API Services (Axios)          │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Configuration Layer              │
│  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │   Env    │  │   API    │  │ Const│ │
│  └──────────┘  └──────────┘  └──────┘ │
└─────────────────────────────────────────┘
```

### Fluxo de Dados

1. **UI Components** → Interação do usuário
2. **Pages** → Lógica de apresentação e navegação
3. **Services** → Chamadas à API
4. **Axios Client** → Requisições HTTP configuradas
5. **API Backend** → Processamento e resposta

### Roteamento

O projeto utiliza **Expo Router** com roteamento baseado em arquivos:

- **Grupos de Rotas**: `(auth)`, `(dashboard)`, `(appointment)` - organizam rotas relacionadas
- **Rotas Dinâmicas**: `[id]` - rotas com parâmetros dinâmicos
- **Layouts**: `_layout.tsx` - define layouts compartilhados

### Gerenciamento de Estado

- **Estado Local**: React Hooks (`useState`, `useEffect`)
- **Formulários**: React Hook Form para gerenciamento de formulários
- **Armazenamento**: AsyncStorage para persistência local
- **Navegação**: Expo Router gerencia o estado de navegação

## 🎨 Decisões Técnicas

### 1. Expo Router vs React Navigation

**Decisão**: Utilizar **Expo Router** com roteamento baseado em arquivos.

**Motivos**:

- Integração nativa com Expo
- Roteamento baseado em arquivos facilita organização
- Suporte a rotas tipadas (TypeScript)
- Menos configuração inicial
- Melhor experiência de desenvolvimento

### 2. React Hook Form + Zod

**Decisão**: Utilizar **React Hook Form** com **Zod** para validação.

**Motivos**:

- Performance superior (menos re-renders)
- Validação declarativa com Zod
- Integração simples com TypeScript
- Menos código boilerplate
- Validação no cliente e servidor com o mesmo schema

### 3. Axios para Requisições HTTP

**Decisão**: Utilizar **Axios** ao invés de `fetch` nativo.

**Motivos**:

- Interceptors para tratamento global de erros
- Configuração centralizada de baseURL e headers
- Melhor tratamento de timeouts
- Suporte a cancelamento de requisições
- API mais consistente

### 4. Configuração de Ambientes Dinâmica

**Decisão**: Sistema de configuração de ambientes baseado em variáveis de ambiente e detecção automática.

**Motivos**:

- Facilita desenvolvimento local e deploy
- Configurações diferentes por ambiente sem alterar código
- Suporte a múltiplos ambientes (dev, prod, local)
- Detecção automática baseada em `__DEV__` e variáveis de ambiente

### 5. New Architecture do React Native

**Decisão**: Habilitar a **New Architecture** (`newArchEnabled: true`).

**Motivos**:

- Melhor performance
- Comunicação mais eficiente entre JS e Native
- Preparação para o futuro do React Native
- Suporte a recursos mais avançados

### 6. TypeScript

**Decisão**: Utilizar **TypeScript** em todo o projeto.

**Motivos**:

- Type safety em tempo de desenvolvimento
- Melhor autocomplete e IntelliSense
- Refatoração mais segura
- Documentação implícita através de tipos
- Redução de bugs em produção

### 7. Estrutura de Pastas por Funcionalidade

**Decisão**: Organizar código por grupos de rotas e funcionalidades.

**Motivos**:

- Facilita localização de código relacionado
- Escalabilidade melhor
- Separação clara de responsabilidades
- Manutenção mais simples

### 8. Componentes Reutilizáveis

**Decisão**: Criar componentes reutilizáveis em `/components`.

**Motivos**:

- DRY (Don't Repeat Yourself)
- Consistência visual
- Manutenção centralizada
- Testes mais fáceis

### 9. Commitizen para Commits

**Decisão**: Utilizar **Commitizen** para padronizar commits.

**Motivos**:

- Histórico de commits mais limpo e legível
- Facilita geração de changelogs
- Padronização entre desenvolvedores
- Melhor rastreabilidade de mudanças

### 10. Jest para Testes

**Decisão**: Utilizar **Jest** com **Jest Expo** preset.

**Motivos**:

- Padrão da comunidade React Native
- Integração com Expo
- Suporte a TypeScript
- Snapshot testing
- Mocking fácil

## 🌍 Ambientes

O projeto suporta três ambientes configuráveis:

### Development (Desenvolvimento)

- **API URL**: `https://api-gb-vowe.onrender.com`
- **Debug**: Ativado
- **Logs**: Detalhados
- **Timeout**: 30s

### Production (Produção)

- **API URL**: `https://api-gb-vowe.onrender.com`
- **Debug**: Desativado
- **Logs**: Apenas erros
- **Timeout**: 15s

### Local (Local)

- **API URL**: `http://192.168.100.11:3333` (configurável)
- **Debug**: Ativado
- **Logs**: Detalhados
- **Timeout**: 10s

Para mais detalhes sobre configuração de ambientes, consulte [`docs/ENVIRONMENTS.md`](./docs/ENVIRONMENTS.md).

## 📜 Scripts Disponíveis

### Scripts de Desenvolvimento

```bash
npm start              # Inicia o servidor Expo (modo padrão)
npm run start:dev      # Inicia em modo desenvolvimento
npm run start:prod     # Inicia em modo produção
npm run start:local    # Inicia com API local
```

### Plataformas Específicas

```bash
npm run android        # Inicia no Android
npm run ios            # Inicia no iOS (apenas macOS)
npm run web            # Inicia no navegador
```

### Configuração de Ambiente

```bash
npm run env:dev        # Configura ambiente de desenvolvimento
npm run env:prod       # Configura ambiente de produção
npm run env:local      # Configura ambiente local
```

### Build

```bash
npm run build:dev      # Build de desenvolvimento (EAS)
npm run build:preview  # Build de preview (EAS)
npm run build:prod     # Build de produção (EAS)
```

### Qualidade de Código

```bash
npm test               # Executa testes em modo watch
npm run lint           # Verifica código com ESLint
npm run commit         # Commit interativo com Commitizen
```

### Utilitários

```bash
npm run server:start   # Inicia servidor local (se configurado)
npm run reset-project  # Reseta projeto para estado inicial
```

## 🚢 Build e Deploy

### EAS Build

O projeto utiliza **EAS Build** (Expo Application Services) para builds nativos.

#### Configuração

A configuração do EAS está em `eas.json` com três perfis:

- **development**: Build para desenvolvimento interno
- **preview**: Build para testes internos
- **production**: Build para produção

#### Comandos de Build

```bash
# Build Android
eas build --platform android --profile development
eas build --platform android --profile preview
eas build --platform android --profile production

# Build iOS
eas build --platform ios --profile development
eas build --platform ios --profile preview
eas build --platform ios --profile production

# Build ambas as plataformas
eas build --platform all --profile production
```

#### Pré-requisitos para Build

1. Conta Expo configurada (`expo login`)
2. EAS CLI instalado (`npm install -g eas-cli`)
3. Projeto configurado (`eas build:configure`)

### Deploy

Após o build, você pode fazer deploy para as lojas:

```bash
# Submeter para Google Play Store
eas submit --platform android

# Submeter para Apple App Store
eas submit --platform ios
```

## 📝 Notas Adicionais

### Troubleshooting

#### Problemas com Emulador Android

Se você encontrar problemas com o emulador Android (segmentation fault), tente:

1. Use `npm run android` que gerencia o emulador automaticamente
2. Ou use um dispositivo físico com Expo Go
3. Consulte o script `scripts/start-emulator-safe.sh` para alternativas

#### Problemas de Conexão com API

- Verifique se a API está rodando
- Confirme a URL da API no arquivo de configuração do ambiente
- Verifique se você está na mesma rede (para ambiente local)

### Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`npm run commit`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Licença

Este projeto é privado.

## 📚 Recursos Adicionais

- [Documentação do Expo](https://docs.expo.dev/)
- [Documentação do React Native](https://reactnative.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

Desenvolvido com ❤️ usando Expo e React Native
