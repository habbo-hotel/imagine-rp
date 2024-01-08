import {Injectable} from '@nestjs/common';

const cluster = require('cluster');
import * as process from 'node:process';

const numCPUs = parseInt(process.argv[2] || '1') * 4;

@Injectable()
export class ClusterService {
  static clusterize(callback: Function): void {
    if (cluster.isMaster) {
      console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      // @ts-ignore
      cluster.on('exit', worker => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      callback();
    }
  }
}
