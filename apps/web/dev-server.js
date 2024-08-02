const cli = require('next/dist/cli/next-dev');
require('dotenv').config();

cli.nextDev({ turbo: true, port: Number(process.env.PORT) || 3000 });
