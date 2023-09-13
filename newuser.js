const axios = require('axios')
require('dotenv').config()

const notableNames = require("./notableList")

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
    console.log(notableNames)
    let userindex;
    while (true) {
        try {
            const req = await fetch("https://prod-api.kosetto.com/users/by-id/" + userindex)
            const res = await req.json();

            if (!res.message) {
                let tw = res.twitterUsername;
                if (notableNames.includes(tw)) {
                    message = {
                        content: 'https://www.friend.tech/rooms/' + res.address + "\n https://basescan.org/address/" + res.address + "\n https://twitter.com/" + res.twitterUsername + "\n @everyone notable name signed up",
                        allowed_mentions: { "parse": ["everyone"] }
                    }
                } else {
                    message = {
                        content: 'https://www.friend.tech/rooms/' + res.address + "\n https://basescan.org/address/" + res.address + "\n https://twitter.com/" + res.twitterUsername
                    };
                }

                post(process.env.WBNU, message)
                userindex++;
            }
            while (res.message) {
                console.log("trying again")
                const req = await fetch("https://prod-api.kosetto.com/users/by-id/" + userindex)
                const res = await req.json();
                console.log(res)

                if (!res.message) {
                    let tw = res.twitterUsername;
                    if (notableNames.includes(tw)) {
                        message = {
                            content: 'https://www.friend.tech/rooms/' + res.address + "\n https://basescan.org/address/" + res.address + "\n https://twitter.com/" + res.twitterUsername + " User Number: " + userindex + "\n @everyone notable name signed up",
                            allowed_mentions: { "parse": ["everyone"] }
                        }
                    } else {
                        message = {
                            content: 'https://www.friend.tech/rooms/' + res.address + "\n https://basescan.org/address/" + res.address + "\n https://twitter.com/" + res.twitterUsername + " User Number: " + userindex
                        };
                    }


                    post(process.env.WBNU, message)
                    userindex++;
                    break;
                }
                await new Promise(r => setTimeout(r, 1000));
            }
            console.log(res)
        } catch (error) {
            console.log(error)
            await new Promise(r => setTimeout(r, 5000));
        }

        await new Promise(r => setTimeout(r, 1000));
    }
}

check();
