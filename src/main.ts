import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec } from 'child_process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  await app.listen(3000);
}

process.once('SIGINT', closeGracefully);

function closeGracefully(signal) {
  const imageDockerName = 'customer-api-cache-1';
  console.log(`Received signal to terminate: ${signal}`);
  console.log(`Stopping image docker with name: ${imageDockerName}`);
  exec(`docker stop ${imageDockerName}`);
  console.log(`Removing image docker with name: ${imageDockerName}`);
  exec(`docker rm ${imageDockerName}`);
  process.kill(process.pid, signal);
}

bootstrap();
