console.log('Service Worker Loaded loqsea...');

self.addEventListener('push', e => {
  console.log(e);
  const data = e.data.json();
  console.log('Push recieved...');

  self.registration.showNotification(data.title, {
    body: 'Check your notifications ;)',
    icon: "https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg"
  });
})
