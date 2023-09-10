const axios = require('axios')
require('dotenv').config()
const notableNames = []

function post(ws, m) {
    axios.post(ws, m)
        .then(response => {
            console.log('Message sent successfully');
        })
        .catch(error => {
            console.error('Error sending message');
        });
}

async function check() {
    let userindex = 164434;
    while (true) {
        console.log(userindex)
        const req = await fetch("https://prod-api.kosetto.com/users/by-id/" + userindex)
        const res = await req.json();

        if (!res.message) {
            let tw = res.twitterUsername;
            if (notableNames.includes(tw)) {
                message = {
                    content: 'https://www.friend.tech/rooms/' + res.address + "\n https://twitter.com/" + res.twitterUsername + "\n @everyone notable name signed up",
                    allowed_mentions: { "parse": ["everyone"] }
                }
            } else {
                message = {
                    content: 'https://www.friend.tech/rooms/' + res.address + "\n https://twitter.com/" + res.twitterUsername
                };
            }

            post(process.env.WBNU, message)
        }
        while (res.message) {
            console.log("trying again")
            const req = await fetch("https://prod-api.kosetto.com/users/by-id/" + userindex)
            const res = await req.json();
            console.log(res)
            await new Promise(r => setTimeout(r, 2000));
            if (!res.message) {
                let tw = res.twitterUsername;
                if (notableNames.includes(tw)) {
                    message = {
                        content: 'https://www.friend.tech/rooms/' + res.address + "\n https://twitter.com/" + res.twitterUsername + "\n @everyone notable name signed up",
                        allowed_mentions: { "parse": ["everyone"] }
                    }
                } else {
                    message = {
                        content: 'https://www.friend.tech/rooms/' + res.address + "\n https://twitter.com/" + res.twitterUsername
                    };
                }


                post(process.env.WBNU, message)
                break;
            }
        }
        console.log(res)

        userindex++;
        await new Promise(r => setTimeout(r, 1000));
    }
}


check();