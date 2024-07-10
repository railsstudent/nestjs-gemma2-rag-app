import { Bootstrap } from '~core/bootstrap';

async function bootstrap() {
  const bootstrap = new Bootstrap();
  await bootstrap.initApp();
  bootstrap.enableCors();
  bootstrap.setupMiddleware();
  bootstrap.setupGlobalPipe();
  bootstrap.setupSwagger();
  bootstrap.startApp();
}
bootstrap()
  .then(() => console.log('Application starts successfully'))
  .catch((err) => console.error(err));
