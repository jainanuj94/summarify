import {CopilotRuntime, copilotRuntimeNextJSAppRouterEndpoint, OpenAIAdapter, } from '@copilotkit/runtime';
import OpenAI from 'openai';
import {NextRequest} from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const llmAdapter = new OpenAIAdapter({
    openai
});

const runtime = new CopilotRuntime();

export const POST = async (req: NextRequest) => {
    const { handleRequest} = copilotRuntimeNextJSAppRouterEndpoint({
        runtime: runtime,
        serviceAdapter: llmAdapter,
        endpoint: '/api/copilotkit'
    });

    return handleRequest(req);
};