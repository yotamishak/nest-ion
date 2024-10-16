// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

import { esbuildDecorators } from '@anatine/esbuild-decorators';

export default $config({
  app(input) {
    return {
      name: 'nest-ion',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2('MyApi');
    api.route('ANY /{proxy+}', {
      handler: 'src/index.handler',
      nodejs: {
        install: [
          '@nestjs/microservices',
          'pg-native',
          'nats',
          'mqtt',
          'kafkajs',
          'grpc',
          'apollo-server-express',
          'apollo-server-fastify',
          'class-transformer/storage',
          'cache-manager',
          '@nestjs/websockets/socket-module',
          'class-transformer',
          'class-validator',
        ],
        // plugins: "plugins.mjs",
        esbuild: {
          plugins: [esbuildDecorators()],
        },
      },
    });
  },
});
