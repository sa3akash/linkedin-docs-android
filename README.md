# Enterprise React Native CLI Architecture (LinkedIn / Instagram / TikTok Scale)

A production-grade, highly scalable React Native CLI application architecture built with **100% Strict TypeScript**, Clean Modular Architecture, Native WebSockets, Reanimated UI-thread animations, MMKV Encrypted Storage, 6-Tier Caching, Advanced Network Layer, and Enterprise Security Hardening.

---

## 🏛️ Architecture Overview

```txt
src/

app/                     # Application entry, navigation stacks, root providers
core/                    # Infrastructure & Core Engine Subsystems
├── analytics/           # Event tracking & telemetry (User, Feed, Jobs, Messaging)
├── animations/          # Reanimated presets, hooks, transitions, gestures, & bottom sheet
├── cache/               # 6-Tier Multi-Level Cache (Memory, MMKV, Disk, React Query, Image, Video)
├── config/              # Environment URLs & build configurations
├── constants/           # Storage keys & limit caps
├── crash-recovery/      # Session snapshots, crash flags, & recovery manager
├── deep-linking/        # Universal, App, Push, Marketing UTM, & Referral link router
├── drafts/              # Unsaved draft auto-save hook & persistent service
├── errors/              # Typed Error hierarchy & global error mapper (mapUnknownToAppError)
├── feature-flags/       # Remote config & A/B testing variants engine
├── lifecycle/           # Foreground auto-reconnect, background timing, & session expiry
├── localization/        # Multi-language i18n translation dictionary
├── media/               # BlurHash image pipeline & HLS/DASH video pipeline
├── monitoring/          # FPS, render latency, & performance monitor
├── navigation/          # React Navigation stacks & tabs
├── network/             # Request engine, deduplication, batching, retry & offline queues
├── permissions/         # Native PermissionsAndroid handlers & feature permission guards
├── responsive/          # Responsive hooks (screen size, breakpoints, orientation, safe area)
├── search/              # Debounced search, infinite search, history, & trending searches
├── security/            # SSL pinning, root/jailbreak detection, FLAG_SECURE, HMAC signing
├── storage/             # Encrypted MMKV key-value storage engine
├── theme/               # Atomic design tokens & theme provider
├── update/              # Force update, soft update, maintenance mode, & store redirects
├── uploads/             # Resumable chunk upload manager
└── websocket/           # Native WebSocket client with auto-reconnect & heartbeat

shared/                  # Cross-Cutting Reusable Assets
├── components/          # 16-Component UI Factory library
├── hooks/               # Custom utility hooks
├── providers/           # AppProviders wrapper tree (QueryClient, SafeArea)
├── services/            # Shared API clients & HTTP services
├── types/               # Global TypeScript definitions
├── utils/               # Formatting & RTL layout helpers
└── validations/         # Form validation schemas
```

---

## ⚡ Quick Start with Bun

### 1. Install Dependencies
```bash
bun install
```

### 2. Strict Type Check & Compilation Audit
```bash
bun x tsc --noEmit
```

### 3. iOS Native Dependencies Setup
```bash
cd ios && bundle exec pod install && cd ..
```

### 4. Run Mobile App
```bash
# Android
bun run android

# iOS
bun run ios
```

---

## 🚀 Key Enterprise Features

### 🔌 Native WebSocket Subsystem
- Native `WebSocket` client (`src/services/socket/socket.service.ts`) built for Elysia / Bun native WS backend servers.
- Auto-reconnect with exponential backoff (up to 10 attempts), 25s ping/pong heartbeats, presence state tracking (`ONLINE`, `AWAY`, `OFFLINE`), and 3s debounced typing clear timers.

### 🎭 Reanimated Animation System (`react-native-reanimated`)
- 60fps native UI-thread execution for presets, hooks, gestures (`SwipeCard`, `SwipeAction`, `PullToRefreshView`, `DragAndDropView`), interactions (`LikeButton`, `RipplePressable`), and `BottomSheetContainer`.

### 🛡️ Enterprise Permission Manager
- Native `PermissionsAndroid` handlers for Camera, Microphone, Contacts, Location, Photos, Notifications, Storage, Bluetooth, Calendar.
- `usePermissionGuard(permissionType)` hook automatically checks and requests device permissions before executing feature callbacks.

### 💾 6-Tier Advanced Caching System
- Memory Cache (LRU + TTL), MMKV Cache, Disk Cache (Base64 binary blobs), React Query Cache, Image Cache, and Video Cache unified under `CacheManager`.

### ⚡ Advanced Network Layer Engine
- Inflight Request Deduplication, 50ms Request Batching, Cache Interceptors, Retry Queue (exponential backoff), Offline Request Queue (MMKV persistence + auto-flush on reconnect), and Request Priority (`HIGH`, `NORMAL`, `LOW`).

### 🎨 16-Component UI Factory (`src/shared/components/ui/`)
- `Avatar`, `Badge`, `Chip`, `Tag`, `Divider`, `Tooltip`, `Snackbar`, `Toast`, `Banner`, `EmptyState`, `ErrorState`, `InfiniteLoader`, `Timeline`, `Tabs`, `Accordion`, `Carousel`.

---

## ⚙️ CI/CD Pipeline Setup
Automated GitHub Actions CI/CD workflow defined in `.github/workflows/ci.yml` powered by `oven-sh/setup-bun@v2` for fast dependency installation and type audits.

---

## 📄 License
MIT License.
