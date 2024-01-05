import React, { createContext } from 'react';
import { WebSocketContext, defaultWebsocketContext } from './WebsocketContext.types';

export const websocketContext = createContext<WebSocketContext>(defaultWebsocketContext);
