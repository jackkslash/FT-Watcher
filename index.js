const { EmbedBuilder } = require('discord.js');

async function test() {
    const ethers = require('ethers');
    const FT = require('./ft.json')
    const axios = require('axios')
    const { EmbedBuilder } = require('discord.js');

    // Configure the provider using an Ethereum node URL
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');

    const contractABI = FT;
    const contractAddress = '0xcf205808ed36593aa40a44f10c7f7c2f67d4a4d4';
    console.log(contractABI)

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    contract.on('Trade', async (from, to, value, event, ethAmount) => {
        try {
            if (ethAmount._hex == "0x00") {
                console.log('From:', from);
                console.log('To:', to);
                console.log('eth: ', ethAmount._hex)
                console.log('eth: ', ethAmount)
                console.log('https://www.friend.tech/rooms/' + to)
                console.log("https://prod-api.kosetto.com/users/" + to)

                let response = await fetch("https://prod-api.kosetto.com/users/" + to);
                let data = await response.json();
                console.log("https://twitter.com/" + data.twitterUsername);
                const webhookUrl = "https://discord.com/api/webhooks/1142627468168142908/PtFM_V4G6veX2oxtDmH-2z6t3kXqmEZUV9ziw-EsvcntIUJXE0nwZVP5VJXO9YWzxZdv"

                if (data.message == "Address/User not found.") {
                    console.log("undefined")
                } else {
                    const notableNames = [
                    ]
                    let message = {}
                    if (notableNames.includes(data.twitterUsername)) {
                        message = {
                            content: 'https://www.friend.tech/rooms/' + to + "\n https://twitter.com/" + data.twitterUsername + "\n @everyone notable name signed up",
                            allowed_mentions: { "parse": ["everyone"] }
                        }
                    } else {
                        message = {
                            content: 'https://www.friend.tech/rooms/' + to + "\n https://twitter.com/" + data.twitterUsername + ""
                        };

                    }
                    axios.post(webhookUrl, message)
                        .then(response => {
                            console.log('Message sent successfully');
                        })
                        .catch(error => {
                            console.error('Error sending message:', error);
                        });
                }


            }
        } catch (error) {
            console.log(error)
        }
    });
}


test();
