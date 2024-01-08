import 'dotenv/config';
import {NestFactory} from '@nestjs/core';
import {WsAdapter} from '@nestjs/platform-ws';
import {ImagineModule} from './imagine.module';
import {ClusterService} from './cluster.service';

async function bootstrap() {
  const app = await NestFactory.create(ImagineModule);
  // @ts-ignore
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.PORT!);
}

ClusterService.clusterize(bootstrap);
