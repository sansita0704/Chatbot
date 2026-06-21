import concurrently from 'concurrently';

concurrently([
    {
        name: 'server',
        command: 'bun run dev', // to start the server app
        cwd: 'packages/server',
        prefixColor: 'cyan', // optional
    },
    {
        name: 'client',
        command: 'bun run dev',
        cwd: 'packages/client',
        prefixColor: 'green',
    },
]);
