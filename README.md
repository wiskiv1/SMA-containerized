# SMA-Containerized

Nextjs application for self hosting "stock exchanges" (for stock market or beer exchange party's), based on Stock Market Anywhere by Marc Bresson. This project is a conversion from a client-side-application running locally on your computer, to a server-side-application.

The original application can be found here: [MarcBresson/Stock-Market-Anywhere](https://github.com/MarcBresson/Stock-Market-Anywhere)

> ⚠️ **Important remarks** ⚠️  
> I am not a security expert! Security was also not a big concern when developing this application.  
> While the admin and sale dashboards are password protected (soon), no significant testing was performed and security issues are likely!  
> In other words: do not expose this application to the open internet for extended periods of time

## Significant changes / new features

- Containerized architecture
- Multiple clients can connect to the application, allowing multiple devices to access the dashboard or sales-panel simultaneously
- Application can be accessed from any modern browser (including Firefox)
- [🚧 Planned] Mobile optimized UI
- [🚧 Planned] sensitive features are password protected
- [🚧 Planned] when ordering multiple drinks, the prices are summed

## Installation

> **Prerequisites**
>
> Production: **Docker** (20+ recommended) & **Docker Compose**
>
> Development: **Node** (18+) & npm

### Production

#### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/SMA-Containerized.git
```

#### 2️⃣ Configure environment variables

make a `.env` file based on example.env in the project root

#### 3️⃣ Build and start the containers

```
docker compose build
docker compose up -d
```

#### 4️⃣ Access the application

- Next.js UI (local browser)  
  http://localhost:4040 (port can be changed in docker-compose.yml)
- Worker API  
  Internal only (not exposed publicly)

#### Stop the application

```
docker compose down
```

### development

⚠️ This is optional and intended for contributors.

#### 1️⃣ install dependencies

```
npm ci
```

#### 2️⃣ Run both services

separately

```
npm run dev:worker
npm run dev:nextjs
```

together

```
npm run dev
```

## Project Structure

```
.
├── public/
│   └── js/                      # frontend javascript files
│
├── src/
│   ├── app/                     # Next.js application
│   ├── lib/                     # extra functions and components used by the frontend
│   │
│   ├── stock_market_anywhere/   # Stock market worker
│   │   ├── api/
│   │   ├── engine/
│   │   ├── utils/
│   │   ├── config.ts            # Market config for seeding
│   │   └── worker.ts
│   │
│   └── types/                   # Shared data types
│
├── build/                       # Compiled worker output
│
├── Dockerfile.next
├── Dockerfile.worker
├── docker-compose.yml
│
├── tsconfig.json
├── tsconfig.worker.json
├── package.json
├── .env                         # Environment file
└── README.md

```

## Notes on deployment

- The worker should not be exposed publicly
  - Only the Next.js container should be reachable from outside
  - Recommended setup:  
    Cloudflare Tunnel → Next.js → Worker
- Containers are configured with:
  - restart: unless-stopped
  - internal Docker networking

## Credits

Original concept and implementation: Marc Bresson  
https://github.com/MarcBresson/Stock-Market-Anywhere

> This project is a server-side adaptation, not a (direct) fork.

## Disclaimer

This software is provided as-is, without warranty of any kind.  
Use at your own risk.
