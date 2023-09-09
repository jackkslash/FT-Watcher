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
    const notableNames = ["vitalikbuterin",
        "therollergame",
        "13yroldwithcc",
        "friendlend",
        "friendlendtech",
        "dougpolkvids",
        "tomdwan",
        "realkidpoker",
        "crypto_bitlord7",
        "bitboy_brypto",
        "cz_binance",
        "garyvee",
        "justinsuntron",
        "elonmusk",
        "jack",
        "brian_armstrong",
        "sama",
        "erikvoorhees",
        "mcuban",
        "punk6595",
        "live_boeree",
        "waitbuywhy",
        "sartoshi_rip",
        "loganpaul",
        "ksicrypto",
        "9gagceo",
        "cryptohaynes",
        "wagieeacc",
        "amouranth",
        "cozomomedici",
        "vince_van_dough",
        "matt_furie",
        "coldbloodshill",
        "thecryptodog",
        "zachxbt",
        "jingtao",
        "ihayato",
        "jackbutcher",
        "beeple",
        "mdudas",
        "andrewchen",
        "lexfridman",
        "icebagz_",
        "paradigm",
        "gabrielleydon",
        "ercwl",
        "tayvano_",
        "floydmayweather",
        "jakepaul",
        "elleleexxx",
        "chamath",
        "jason",
        "devinbook",
        "whyillbedamned",
        "brian_armstrong",
        "degenharambe",
        "sama",
        "gadhziiman",
        "naval",
        "tferriss",
        "ajv",
        "drake",
        "mrbeast",
        "chandlerhallow",
        "karljacobs_",
        "nolansrollin",
        "kristyson_",
        "adinross",
        "steveaoki",
        "ricegum",
        "cobratate",
        "postmalone",
        "jrue_holiday11",
        "tyhaliburton22",
        "giannis_an34",
        "corinnakopf",
        "parishilton",
        "realdonaldtrump",
        "pokimanelol",
        "driftershoots",
        "aplusk",
        "sethgreen",
        "rac",
        "joshhart",
        "thechainsmokers",
        "aplusk",
        "hannahsh0rny",
        "tiffany_gomas",
        "kanyewest",
        "grimezsz",
        "valkyrae",
        "timbaland",
        "sc",
        "eminem",
        "iamjamiefoxx",
        "lilbaby4PF",
        "1future",
        "jimmyfallon",
        "mikeyyson",
        "neymarjr",
        "serenawilliams",
        "mel0d1p",
        "stephencurry30",
        "shaq",
        "bensimmons25",
        "vonmiller",
        "dezbryant",
        "notapornfolder_"]

    let prevName;
    contract.on('Trade', async (from, to, value, event, ethAmount, shareAmount, supply, trader, subject) => {
        try {
            if (ethAmount._hex == "0x00" && subject.args.trader == subject.args.subject && subject.args.supply.toNumber() == 1) {
                console.log("trader: " + trader)
                console.log(subject.args.trader)
                console.log(subject.args.subject)
                console.log('eth: ', ethAmount._hex)
                console.log('eth: ', ethAmount)
                console.log('supply', subject.args.supply.toNumber())
                console.log('https://www.friend.tech/rooms/' + subject.args.subject)
                console.log("https://prod-api.kosetto.com/users/" + subject.args.subject)
                await sleep(1500);
                let response = await fetch("https://prod-api.kosetto.com/users/" + subject.args.subject);
                let data = await response.json();
                console.log(data)
                console.log("https://twitter.com/" + data.twitterUsername);

                if (data.message == "Address/User not found.") {
                    console.log("undefined")
                    message = {
                        content: 'https://www.friend.tech/rooms/' + to
                    };
                    req(process.env.WB1, message)
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
                            if (prevName === twName) {
                                console.log("REPEAT SKIP")
                            } else {
                                if (notableNames.includes(twName)) {
                                    message = {
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
                                    req(process.env.WB2, message)
                                    message = {}
                                } else if (twitterUserFollowCount >= 10000 && notable == true) {
                                    req(process.env.WB3, message)
                                    message = {}
                                } else if (twitterUserFollowCount > 1) {
                                    req(process.env.WB1, message)
                                    message = {}
                                } else {
                                    console.log("not enough followers")
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function req(socket, message) {
    axios.post(socket, message)
        .then(response => {
            console.log('Message sent successfully');
        })
        .catch(error => {
            console.error('Error sending message');
        });
}
test();
