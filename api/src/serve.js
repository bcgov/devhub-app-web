import app from './index';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  // eslint-disable-next-line
  console.log(`Listening on ${host}:${port}`);
});
