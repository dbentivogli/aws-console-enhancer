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

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.method !== 'getUserData') return;
    console.log('ricevuto');
    getUserData().then(data => {
        console.log(data)
        sendResponse(data);
    })
    return true;
});