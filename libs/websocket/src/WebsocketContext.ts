import React, { createContext } from 'react';
import { WebsocketContext, defaultWebsocketContextInterface } from './WebsocketContext.types';

export const websocketContext = createContext<WebsocketContext>(
  defaultWebsocketContextInterface
);
