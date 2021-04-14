// JavaScript source code
function getOs() {
    const userAgent = navigator.userAgent || navigator.vendor;
    console.log(navigator.userAgent);
    console.log(navigator.vendor);
    console.log(navigator.platform);
    if (/MicroMessenger/i.test(userAgent)) {
        console.log('wechat');
        return "wechat";
    }
    if (/android/i.test(userAgent)) {
        console.log('android')
        return "Android";
    }

    if (/iPad|iPhone|iPod/i.test(userAgent) && !window.MSStream) {
        console.log('ios');
        return "iOS";
    }
    console.log('pc');
    return "PC";
}


function reportAndNavigate(flavor, appStoreAppId, MsStoreID, weChatUrl) {

    function goToAppStore() {
        //window.location.href = `itms-apps://itunes.apple.com/app/id${appStoreAppId}`;
        window.location.href = "linktomyasus://";
        //window.location.href = `itms-apps://apps.apple.com/us/app/link-to-myasus/id${appStoreAppId}`;
        setTimeout(function(){

            window.location.href = `itms-apps://apps.apple.com/us/app/link-to-myasus/id${appStoreAppId}`;
            window.location.href = `itms-apps://apps.apple.com/us/app/link-to-myasus/id${appStoreAppId}`;  //爲什麼要加兩遍我下面會說到

        },2000)
        //window.location.href = `itms-apps://itunes.apple.com/app/id${appStoreAppId}`;
    }

    function goToAndroidStore() {
        window.location.href = "linktomyasus://";
        setTimeout(function(){

            window.location.href = `market://details?id=${flavor}`;
            window.location.href = `market://details?id=${flavor}`;

        },2000)
    }
    
    function goToWeChat() {
        window.location.href = weChatUrl;
    }


    function goToPCStore() {
        window.location.href = `https://www.microsoft.com/en-us/p/${MsStoreID}`;
    }

    function goToStore() {
        // defualts to android if it's not iOS, unidentified OS issue can be indentified via Mixpanel
        if (os === 'wechat' && weChatUrl) {
            goToWeChat();
        }
        else if (os === "iOS") {
            goToAppStore();
        } else if (os === 'Android' || MsStoreID === undefined) {
            goToAndroidStore();
        } else {
            goToPCStore();
        }
    }

    const os = getOs();

    // first paramater eventname 
    mixpanel.track("QR Read without app", { os }, () => goToStore());
}


reportAndNavigate('com.asus.syncv2','1481035824','hello',null)
