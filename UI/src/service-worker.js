// Pobieranie danych z serwera
importScripts("https://js.pusher.com/beams/service-worker.js");

async function getData(uuid) {
    const events = await push("https://t-mt-backend.fly.dev/"+ uuid +"/event/today");
    const todo = await push("https://t-mt-backend.fly.dev/" + uuid +"/todo/today");
}

// Ustawienie Timer API Service Workera
self.addEventListener('install', (event) => {
    const start = new Date();
    start.setHours(6, 0, 0, 0);
    const time = start.getTime() - Date.now();

    self.setTimeout(() => {
        getData();
        self.setInterval(getData, 24 * 60 * 60 * 1000);
    }, time);
});

self.addEventListener('push', function(event) {
    if (event.data) {
        const payload = event.data.json();
        if(Object.keys(payload).length > 0){
            const now = new Date();
            const hours = now.getHours();
            if (hours === 6) {
                if(localStorage.getItem('language')){
                    self.registration.showNotification('Notification', {
                        body: 'You have something planed today. Better look what!',
                        icon: './favicon.png',
                    }); 
                }else{
                    self.registration.showNotification('Powiadomienie', {
                        body: 'Masz coś na dziś zaplanowane. Lepiej zobacz co!',
                        icon: './favicon.png',
                    });
                }
            }
        }
    }
});
