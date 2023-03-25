console.log('Content loaded')

function findElement(path) {
    console.log('Trying to find element', path)
    const element = document.querySelector(path);
    if(element) {
        return element;
    }

    console.log('Element ' + path + ' not found')
    return false
}

function findElements(path) {
    const elements = document.querySelectorAll(path);
    return elements;
}

function hideElements(elements) {
    elements.forEach(element => {
        hideElement(element)
    });
}

function hideElement(element) {
    if(element) {
        element.remove()
    } else {
        console.log('Could not hide element ' + element + ' not found')
    }
}

function hide(path) {
    console.log('Hiding element', path)
    const element = findElement(path)

    // Check if the element was found
    if (element) {
        console.log("Element found:", element);
        hideElement(element)
    } else {
        console.log("Element not found");
    }
}

function hideEverything() {
    // needed so chrome see everything
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            // header / footer / messenger
            hide("#global-nav")
            hide("#profile-content > div > div.scaffold-layout.scaffold-layout--breakpoint-xl.scaffold-layout--main-aside.scaffold-layout--reflow.pv-profile > div > div > aside")
            hide("#msg-overlay")
            hide("#msg-overlay > div.msg-overlay-list-bubble.msg-overlay-list-bubble--is-minimized.ml4")
            hide(".msg-overlay-list-bubble")
            hide(".global-footer--static")

            // useless sections
            hideElement(findElement('#insights').parentNode)
            hideElement(findElement('#resources').parentNode)
            hideElement(findElement('#recent_activity').parentNode)
            hideElement(findElement('#skills').parentNode)
            hideElement(findElement('#interests').parentNode)
            document.querySelector('#profile-sticky-header-toggle').parentNode.querySelectorAll('.artdeco-carousel__content').forEach(element => {
                // element.style.display = 'none'
                element.remove()
            })

            // edit buttons
            hideElements(findElements('.artdeco-button'))
            hideElements(findElements('.pvs-navigation__icon'))

            // floatting navbar
            hide('.scaffold-layout-toolbar--is-fixed.scaffold-layout-toolbar--is-fixed-visible')

            // make more info visible
            const loadMoreButtons = findElements('.inline-show-more-text');
            loadMoreButtons.forEach(element => {
               element.classList.remove('inline-show-more-text--is-collapsed')
               element.classList.remove('inline-show-more-text--is-collapsed-with-line-clamp')
            });
            hideElements(findElements('.inline-show-more-text__button'))

            // Make everything 100% width
            findElements('.scaffold-layout__content').forEach(element => {
                element.style.display = 'flex'
            });
        }, 300)
    }, 300)
}

setTimeout(() => {
    hideEverything()
}, 2000);
