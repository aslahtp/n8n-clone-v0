# n8n Clone - Workflow Automation Platform

A modern workflow automation platform inspired by n8n, built with a visual node-based interface for creating and executing automated workflows. This project combines AI agents, custom tools, and integrations to enable powerful automation capabilities.

## 🚀 Features

- **Visual Workflow Builder**: Drag-and-drop interface built with React Flow for creating complex workflows
- **AI Agent Integration**: Powered by LangChain and LangGraph for intelligent workflow automation
- **Node-Based System**:
  - **Trigger Nodes**: Manual and event-based triggers to start workflows
  - **Agent Nodes**: AI-powered agents that can make decisions and interact with tools
  - **Tool Nodes**: Custom tools for various operations (HTTP requests, calculations, etc.)
  - **Model Nodes**: LLM model configuration for AI agents
- **Authentication**: JWT-based user authentication and authorization
- **Workflow Execution**: Queue-based execution system using BullMQ and Redis
- **Credential Management**: Secure storage and management of API credentials
- **Database**: MongoDB for persistent storage of workflows, users, and credentials

## 📁 Project Structure

This is a [Turborepo](https://turborepo.com) monorepo containing the following packages and apps:

### Apps

- **`apps/server`**: Express.js backend server (Bun runtime)
  - RESTful API for workflows, authentication, and credentials
  - Workflow execution engine with queue management
  - LangChain integration for AI agents
  - MongoDB database models and schemas

- **`apps/web`**: Next.js frontend application
  - Visual workflow builder interface
  - User authentication pages
  - Workflow management dashboard
  - React Flow-based graph visualization

### Packages

- **`packages/ui`**: Shared React component library
  - Reusable UI components (Button, Card, Code, etc.)
  - Shared across web application

- **`packages/eslint-config`**: ESLint configurations
  - Shared linting rules for the monorepo

- **`packages/typescript-config`**: TypeScript configurations
  - Base TypeScript configs for different project types

## 🛠️ Tech Stack

### Backend

- **Runtime**: Bun
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Queue**: BullMQ with Redis
- **AI/ML**: LangChain, LangGraph, Google Generative AI
- **Authentication**: JWT (JSON Web Tokens)

### Frontend

- **Framework**: Next.js
- **UI Library**: React Flow
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

### Development

- **Monorepo**: Turborepo
- **Language**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier

## 📋 Prerequisites

- **Node.js*
- **Bun**: Latest version (for server runtime)
- **MongoDB**: Running instance (local or remote)
- **Redis**: Running instance (for queue management)

## 🚦 Getting Started

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd n8n-clone-v0
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create `.env` files in the respective app directories:

**`apps/server/.env`**:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/n8n-clone
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key-here
GOOGLE_API_KEY=your-google-api-key-here
```

**`apps/web/.env.local`** (if needed):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Running the Development Servers

Start all apps in development mode:

```bash
npm run dev
```

Or run specific apps:

```bash
# Start only the web app
npm run dev --filter=web

# Start only the server
npm run dev --filter=server
```

The applications will be available at:

- **Web App**: http://localhost:3010
- **Server API**: http://localhost:4000

## 📜 Available Scripts

From the root directory:

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps and packages
- `npm run lint` - Lint all packages
- `npm run check-types` - Type-check all packages
- `npm run format` - Format code with Prettier




## 🧪 Development Workflow

1. **Create a Workflow**: Use the visual builder in the web app to design your workflow
2. **Add Nodes**: Drag and drop trigger, agent, tool, and model nodes
3. **Configure Nodes**: Set parameters and credentials for each node
4. **Connect Nodes**: Link nodes together to define the workflow execution path
5. **Execute**: Trigger the workflow manually or set it to run automatically

## 📚 Architecture

### Workflow Execution Flow

1. **Trigger**: A workflow starts with a trigger node (manual or event-based)
2. **Node Execution**: Each node executes sequentially based on connections
3. **Agent Processing**: Agent nodes can use connected tools and models to perform complex operations
4. **Queue Management**: Workflow executions are queued using BullMQ for scalability
5. **State Management**: Execution state is tracked and persisted throughout the workflow

### Node Types

- **Trigger Nodes**: Entry points for workflows
- **Agent Nodes**: AI agents that can use tools and make decisions
- **Tool Nodes**: Reusable functions (HTTP requests, calculations, etc.)
- **Model Nodes**: LLM configuration for AI agents

## 🔐 Authentication

The application uses JWT-based authentication:

- Sign up to create a new account
- Sign in to authenticate
- Protected routes require valid JWT tokens
- Credentials are securely stored and encrypted


## 📝 License

This project is private and proprietary.

## 🔗 Useful Links

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Flow Documentation](https://reactflow.dev)
- [LangChain Documentation](https://js.langchain.com)
- [Bun Documentation](https://bun.sh/docs)
