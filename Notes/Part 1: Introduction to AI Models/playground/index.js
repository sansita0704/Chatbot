// Counting Tokens

import { get_encoding } from 'tiktoken';

const encoding = get_encoding('cl100k_base');
const tokens = encoding.encode(
    'Hello world! This is the first test of tiktoken library.'
);

console.log(tokens);

// Calling AI Model

import OpenAI from 'openai';

const OPENAI_API_KEY = 'API-KEY';

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const stream = await client.responses.create({
    model: 'gpt-3.5-turbo',
    input: 'Write a story about a robot',
    temperature: 0.7,
    max_output_tokens: 250,
    stream: true,
});

// stream is an async iterable.
// for await (const event of stream) console.log(event);
for await (const event of stream)
    if (event.delta) process.stdout.write(event.delta);
