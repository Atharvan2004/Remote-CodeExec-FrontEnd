import {io, ManagerOptions, SocketOptions} from 'socket.io-client';
import { BASE_URL } from './config';

export const initSocket = async () => {
    const options: Partial<ManagerOptions & SocketOptions> = {
        'forceNew': true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };
    
    return io(`${BASE_URL}`, options);
};  