import 'dotenv/config';
import server from './server';

// server.listen(process.env.APP_PORT);
server.listen(process.env.APP_PORT);

console.log(`The Server is running at PORT ${process.env.APP_PORT}`);
console.log(`Host: ${process.env.APP_URL}`);
