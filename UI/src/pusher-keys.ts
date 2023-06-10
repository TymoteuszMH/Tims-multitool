import * as PusherPushNotifications from "@pusher/push-notifications-web";


export const instance = '2111c416-a6c8-4d12-8036-7dc4e6f2d00c';
export const key = 'EE3433B5D84E4D8F3F99A26F1FF395D88D9066158CF010DD8E429156DDA0FD89';

export const beamsClient = new PusherPushNotifications.Client({
    instanceId: instance,
});