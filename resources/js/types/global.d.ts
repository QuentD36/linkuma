import { AxiosInstance } from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/types/src/core/pusher';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo;
        Pusher: any
    }

    var route: typeof ziggyRoute;
}
