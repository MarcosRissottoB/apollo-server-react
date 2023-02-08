import { startServer } from './app';

async function main() {
  const url = await startServer();
  console.log('Server running on port: ', url);
}

main();
