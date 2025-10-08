import { Nodes } from "../db/model";
import type { CredentialSchema, ParameterSchema } from "../nodes/types";

type SeedNode = {
  name: string;
  code: string;
  type: string;
  icon: string;
  parameters?: Record<string, ParameterSchema>;
  credentials?: Record<string, CredentialSchema>;
};

const defaultNodes: SeedNode[] = [
  {
    name: "Manual Trigger",
    code: "MANUAL",
    type: "trigger",
    icon: "/globe.svg",
  },
  {
    name: "AI Agent",
    code: "AGENT",
    type: "agent",
    icon: "/window.svg",
    parameters: {
      query: {
        type: "string",
        required: true,
        label: "Prompt",
        placeholder: "Summarise the latest email",
      },
    },
  },
  {
    name: "Email Sender",
    code: "EMS",
    type: "node",
    icon: "/file-text.svg",
    parameters: {
      to: {
        type: "string",
        required: true,
        label: "Recipient",
        placeholder: "user@example.com",
      },
      subject: {
        type: "string",
        required: true,
        label: "Subject",
        placeholder: "Weekly update",
      },
      body: {
        type: "string",
        required: true,
        label: "Body",
        placeholder: "Share the highlights…",
      },
    },
    credentials: {
      user: {
        type: "username",
        required: true,
        label: "Gmail user",
        placeholder: "example@gmail.com",
      },
      pass: {
        type: "password",
        required: true,
        label: "App password",
        placeholder: "xxxx xxxx xxxx xxxx",
      },
    },
  },
  {
    name: "Addition Tool",
    code: "ADDITION",
    type: "tool",
    icon: "/next.svg",
  },
  {
    name: "Multiply Tool",
    code: "MULTIPLY",
    type: "tool",
    icon: "/vercel.svg",
  },
  {
    name: "Fetch Tool",
    code: "FETCH",
    type: "tool",
    icon: "/turborepo-dark.svg",
    parameters: {
      url: {
        type: "string",
        required: true,
        label: "URL",
        placeholder: "https://api.example.com/data",
      },
    },
  },
  {
    name: "Gemini Model",
    code: "GEMINI",
    type: "model",
    icon: "/turborepo-light.svg",
    parameters: {
      modelName: {
        type: "string",
        required: true,
        label: "Model",
        placeholder: "gemini-2.0-flash",
      },
    },
    credentials: {
      apiKey: {
        type: "password",
        required: true,
        label: "API Key",
        placeholder: "Your Gemini API key",
      },
    },
  },
];

export async function seedNodes() {
  const existingCount = await Nodes.countDocuments();
  if (existingCount > 0) {
    return;
  }

  await Nodes.insertMany(defaultNodes);
  console.log("Seeded default workflow nodes");
}

