require('dotenv').config()
const axios = require('axios')
async function test() {
    const ethers = require('ethers');
    const FT = require('./ft.json')
    const jsdom = require("jsdom");


    // Configure the provider using an Ethereum node URL
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');

    const contractABI = FT;
    const contractAddress = '0xcf205808ed36593aa40a44f10c7f7c2f67d4a4d4';
    console.log(contractABI)

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const notableNames = []

    let prevName;
    contract.on('Trade', async (from, to, value, event, ethAmount, shareAmount, supply) => {
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

                if (data.message == "Address/User not found.") {
                    console.log("undefined")
                } else {

                    fetch('https://nitter.cz/' + data.twitterUsername)
                        .then(function (response) {
                            // When the page is loaded convert it to text
                            return response.text()
                        })
                        .then(function (html) {
                            const dom = new jsdom.JSDOM(html);
                            const element = dom.window.document.getElementsByClassName("profile-stat-num");

                            console.log(element[2].innerHTML);
                            const twitterUserFollowCount = element[2].innerHTML.replace(/\,/g, '');
                            console.log(twitterUserFollowCount)


                            let message = {}
                            let twName = data.twitterUsername.toLowerCase();
                            let notable = false;
                            console.log(twName)
                            console.log(prevName)
                            if (prevName === twName || twName === "hunilibaskan") {
                                console.log("REPEAT SKIP")
                            } else {

                                if (notableNames.includes(twName)) {
                                    messageNot = {
                                        content: 'https://www.friend.tech/rooms/' + to + "\n https://twitter.com/" + data.twitterUsername + "\n @everyone notable name signed up",
                                        allowed_mentions: { "parse": ["everyone"] }
                                    }
                                    notable = true;
                                } else {
                                    message = {
                                        content: 'https://www.friend.tech/rooms/' + to + "\n https://twitter.com/" + data.twitterUsername + " " + twitterUserFollowCount
                                    };
                                }

                                if (twitterUserFollowCount >= 10000 && notable == false) {
                                    req(process.env.WB2, messageNot)
                                    messageNot = {}
                                } else if (twitterUserFollowCount >= 10000 && notable == true) {
                                    req(process.env.WB3, messageNot)
                                    messageNot = {}
                                } else {
                                    req(process.env.WB1, message)
                                    message = {}
                                }
                            }
                            prevName = twName;

                        })
                        .catch(function (err) {
                            console.log('Failed to fetch page: ', err);
                        });



                }


            }
        } catch (error) {
            console.log(error)
        }
    });
}

function req(socket, message) {
    axios.post(socket, message)
        .then(response => {
            console.log('Message sent successfully');
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}
test();
