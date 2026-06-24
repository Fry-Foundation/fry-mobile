# Fry Networks Mobile

Android app for managing Fry Networks DePIN miners, claiming FRY rewards, registering new devices, and managing verification stakes.

## Stack

- **React Native + Expo** (SDK 52)
- **Expo Router** — file-based navigation
- **TypeScript** — strict mode
- **EAS Build** — APK/AAB generation

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Home | `/` | Fleet overview, claimable rewards, quick actions |
| Miners | `/miners` | Search/filter device list, tap for detail |
| Miner Detail | `/miners/[id]` | Stats, integrations, logs, manage/remove |
| Rewards | `/rewards` | Epoch claim, wallet, breakdown table, payout history |
| Register | `/register` | QR scan or manual MAC entry, device type selection |
| Stake | `/stake` | Tier selection (1×/1.5×/3×), fNODE balances, stake/unstake |

## Setup

```bash
# Install dependencies
npm install

# Start dev server (scan QR with Expo Go on phone)
npx expo start

# Build preview APK
eas build --platform android --profile preview

# Build production AAB
eas build --platform android --profile production
```

## Brand System

Colors, fonts, spacing, token IDs, and stake tiers are centralized in `constants/theme.ts`. This is the single source of truth for all visual constants.

Mock data lives in `constants/mockData.ts` — replace with API calls to:
- `dashboard.frynetworks.com` — miner fleet, rewards, epochs
- Hardware API on ZEUS00 (port 8084) — device registration, status
- Algorand (algod on ATLAS00:8190) — on-chain balances, staking

## Architecture Notes

- **Verification tiers** are 1× (no stake), 1.5× (500 fNODE), 3× (1,500 fNODE). Source of truth is the admin panel (`main.products`).
- **Wallet connection** uses Pera WalletConnect (signing only — no mnemonic storage).
- **Token IDs**: FRY 2.0 = ASA 2485314946, fNODE = ASA 2485202024.
- **Integrations**: Mysterium, Presearch, Diiisco, Olostep, SpaceAcres.

## License

Proprietary — Fry Networks / Fry Foundation
