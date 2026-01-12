# SMA-Containerized

Nextjs application for self hosting "stock exchanges" (for stock market or beer exchange party's), based on Stock Market Anywhere by Marc Bresson. This project is a conversion from a client-side-application running locally on your computer, to a server-side-application.

The original application can be found here: [MarcBresson/Stock-Market-Anywhere](https://github.com/MarcBresson/Stock-Market-Anywhere)

> ⚠️ **Important remarks** ⚠️  
> I am not a security expert! Security was also not a big concern when developing this application.  
> While the admin and sale dashboards are password protected (soon), no significant testing was performed and security issues are likely!  
> In other words: do not expose this application to the open internet for extended periods of time

## Significant changes / new features

- Multiple clients can connect to the application, allowing multiple devices to access the dashboard or sales-panel simultaneously
- Application can be accessed from any modern browser (including Firefox)
- [🚧 Planned] Mobile optimized UI
- [🚧 Planned] sensitive features are password protected
- [🚧 Planned] when ordering multiple drinks, the prices are summed

## Installation

> **Prerequisites**  
> modern version of docker (and nextjs? and node?)

### development

npm ci

npm run dev / dev:worker / dev:nextjs

## Project Structure

---

---

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
