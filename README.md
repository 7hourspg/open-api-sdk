# Open API SDK

A modern React application that automatically generates a fully-typed SDK from an OpenAPI/Swagger specification, providing a seamless developer experience with type-safe API calls, intelligent caching, and a minimal, beautiful UI.

## ✨ Features

- 🔄 **Auto-generated SDK** - Type-safe API client generated from `swagger.json`
- 🎯 **TypeScript First** - Full type safety from API to UI
- ⚡ **React Query Integration** - Built-in data fetching with intelligent caching
- 🛣️ **File-based Routing** - TanStack Router with automatic code splitting
- 🎨 **Minimal Design** - Clean, modern UI with Tailwind CSS
- 🚀 **Fast Development** - Vite-powered with HMR
- 💾 **Smart Caching** - Optimized cache configuration for better performance

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Routing**: TanStack Router
- **Data Fetching**: TanStack React Query
- **SDK Generation**: @hey-api/openapi-ts
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Validation**: Zod


# Generate SDK from swagger.json
pnpm generate:sdk
```


## 📁 Project Structure

```
open-api-sdk/
├── src/
│   ├── client/              # Auto-generated SDK
│   │   ├── sdk.gen.ts       # API functions
│   │   ├── types.gen.ts     # TypeScript types
│   │   └── @tanstack/       # React Query hooks
│   ├── routes/              # File-based routes
│   │   ├── index.tsx        # Home page
│   │   └── $id.tsx          # Dynamic route
│   ├── Home.tsx             # Users list page
│   ├── single-user.tsx      # User detail page
│   └── main.tsx             # App entry point
├── scripts/
│   └── index.ts             # SDK generation script
├── swagger.json             # OpenAPI specification
└── package.json
```

## 🔧 SDK Generation

The SDK is automatically generated from your `swagger.json` file using `@hey-api/openapi-ts`. 

**Generate the SDK:**
```bash
pnpm generate:sdk
```

This command:
- Reads `swagger.json`
- Generates type-safe API functions
- Creates React Query hooks
- Outputs everything to `src/client/`

**Generated Files:**
- `sdk.gen.ts` - API functions (e.g., `getApiV1Users()`)
- `types.gen.ts` - TypeScript types
- `@tanstack/react-query.gen.ts` - React Query hooks
- `zod.gen.ts` - Zod validation schemas

## 📖 Usage Examples

### Using Generated SDK

```typescript
import { getApiV1UsersOptions } from "./client/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

function UsersList() {
  const { data, isLoading, error } = useQuery(getApiV1UsersOptions());
  
  // data is fully typed!
  return <div>{/* ... */}</div>;
}
```

### Client Configuration

The API client is configured in `src/main.tsx`:

```typescript
import { client } from "./client/client.gen";

client.setConfig({
  baseURL: "https://fakerestapi.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});
```

## ⚙️ Configuration

### React Query Cache Settings

Optimized caching is configured in `src/main.tsx`:

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,        // 5 minutes
      gcTime: 10 * 60 * 1000,          // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
```

### Routing

TanStack Router is configured with:
- File-based routing
- Automatic code splitting
- Preloading on intent
- Type-safe navigation

## 🎨 UI Features

- **Minimal Design** - Clean, neutral color scheme
- **Responsive Layout** - Works on all screen sizes
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages
- **Navigation** - Seamless routing between pages

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |
| `pnpm generate:sdk` | Generate SDK from swagger.json |

## 🔄 Updating the SDK

When your API changes:

1. Update `swagger.json` with the latest OpenAPI spec
2. Run `pnpm generate:sdk`
3. The SDK will be regenerated with new types and functions

## 📚 Learn More

- [@hey-api/openapi-ts Documentation](https://heyapi.vercel.app/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack React Query](https://tanstack.com/query)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 💭 About This Project

This project was an exploration into auto-generated SDKs from OpenAPI/Swagger specifications. I was trying out different approaches to building type-safe API clients and really enjoyed the experience of:

- Working with `@hey-api/openapi-ts` to generate fully-typed SDKs
- Setting up TanStack Router for file-based routing
- Configuring React Query for optimal caching strategies
- Building a minimal, clean UI with Tailwind CSS

The seamless integration between all these tools made the development process smooth and enjoyable! 🚀


---

Built with ❤️ by [@7hourspg](https://github.com/7hourspg)
