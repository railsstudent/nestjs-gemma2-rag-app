import { Bootstrap } from '~core/bootstrap';

async function bootstrap() {
  const bootstrap = new Bootstrap();
  await bootstrap.initApp();
  bootstrap.enableCors();
  bootstrap.setupMiddleware();
  bootstrap.setupGlobalPipe();
  bootstrap.setupSwagger();
  return bootstrap.startApp();
}

bootstrap()
  .then((port) => console.log(`Application starts at port ${port} successfully.`))
  .catch((err) => console.error(err));
