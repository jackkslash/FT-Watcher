const axios = require('axios')
require('dotenv').config()

async function check() {
    let userindex = 0;
    while (true) {
        console.log(userindex)
        const req = await fetch("https://prod-api.kosetto.com/users/by-id/" + userindex)
        const res = await req.json();

        if (!res.message) {
            message = {
                content: 'https://www.friend.tech/rooms/' + res.address + "\n https://twitter.com/" + res.twitterUsername
            };

            axios.post(process.env.WBNU, message)
                .then(response => {
                    console.log('Message sent successfully');
                })
                .catch(error => {
                    console.error('Error sending message');
                });
        }
        while (res.message) {
            console.log("trying again")
            const req = await fetch("https://prod-api.kosetto.com/users/by-id/" + userindex)
            const res = await req.json();
            console.log(res)
            await new Promise(r => setTimeout(r, 2000));
            if (!res.message) {
                message = {
                    content: 'https://www.friend.tech/rooms/' + res.address + "\n https://twitter.com/" + res.twitterUsername
                };

                axios.post(process.env.WBNU, message)
                    .then(response => {
                        console.log('Message sent successfully');
                    })
                    .catch(error => {
                        console.error('Error sending message');
                    });
                break;
            }
        }
        console.log(res)

        userindex++;
        await new Promise(r => setTimeout(r, 1000));
    }
}

check();