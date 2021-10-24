
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.method !== 'getUserData') return;
    getUserData().then(data => sendResponse(data));
    return true;
});


async function getUserData() {
    var cookies = await chrome.cookies.getAll({});

    let userInfo = cookies.find(c => c.name === 'aws-userInfo' && c.domain === '.amazon.com');
    if (!userInfo) return;

    userInfo = JSON.parse(decodeURIComponent(userInfo.value));
    let [, accountId, role, username] = /::([0-9]+).+_(.*?)_.+\/(.*)$/.exec(userInfo.arn);

    return {
        accountId,
        accountAlias: userInfo.alias,
        username,
        role
    };
}

async function isUserLoggedIn(){
    let auth = chrome.storage.sync.get(['googAuthToken'], (value)=>{
        console.log(value);
    });
}

async function getAuthToken (){
    // await chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    //     console.log('TOKEN', token  )
    // });
    return new Promise(resolve => {
        chrome.storage.sync.set({googAuthToken: 'ciao'}, (data)=> {
            console.log('data stored', data);
            resolve(data);
        });
    })
}

getAuthToken().then(isUserLoggedIn())