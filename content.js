(async function enhancer() {
    //let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // if (tab?.url) {
    //   try {
    //     let url = new URL(tab.url);
    //     input.value = url.hostname;
    //   } catch {}
    // }

    // console.log(chrome);
    // var cookies = await chrome.cookies.getAll({})
    // // console.log(JSON.stringify(cookies, null, 2));
    // alert(JSON.stringify(cookies[0], null, 2));


    chrome.runtime.sendMessage({ method: "getUserData" }, function (response) {
        console.log(response);
    });

})();