import {io, ManagerOptions, SocketOptions} from 'socket.io-client';

export const initSocket = async () => {
    const options: Partial<ManagerOptions & SocketOptions> = {
        'forceNew': true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };
    
    return io('http://localhost:3000', options);
};  