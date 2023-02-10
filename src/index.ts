import { startServer } from './app';

async function main() {
  const app = await startServer();
  app.listen( (err) => {
    if (err) console.log("Error in server setup")
    console.log("Server running")
  })
}

main();
