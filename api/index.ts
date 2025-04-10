// api/index.ts
import express from 'express';
import createHandler from '@vendia/serverless-express';

const app = express();

app.get('/', (req, res) => {
  res.send('✅ Werkt! Express op Vercel!');
});

export default createHandler({ app });
