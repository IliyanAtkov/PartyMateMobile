var frameModule = require("ui/frame");

function doNav(navEntry) {
    var topmost = frameModule.topmost();
    topmost.navigate(navEntry);
}

function navigate(toPagePath, contextObj) {
    var navEntry = {
        moduleName: toPagePath,
        context: contextObj
    };

    doNav(navEntry);
}

function navigateAnimated(toPagePath, contextObj) {
    var navEntry = {
        moduleName: toPagePath,
        context: contextObj,
        animated: true,
        navigationTransition: {
            transition: "flip",
            duration: 350,
            curve: "easeIn"
        }
    };

    doNav(navEntry);
}

function navigateWithEntry(navigationEntry) {
    doNav(navigationEntry);
}

module.exports = {
    navigate: navigate,
    navigateAnimated: navigateAnimated,
    navigateWithEntry: navigateWithEntry
}
