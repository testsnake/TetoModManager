


let eventHandlers = {};
let gamepadKeybinds = {
    "dpadUp": 12,
    "dpadDown": 13,
    "dpadLeft": 14,
    "dpadRight": 15,
    "buttonOptions": 9,
    "buttonShare": 8,
    "buttonSquare": 2,
    "buttonTriangle": 3,
    "buttonCancel": 1,
    "buttonConfirm": 0,
    "buttonL1": 4,
    "buttonR1": 5,
    "buttonL2": 6,
    "buttonR2": 7,
    "buttonL3": 10,
    "buttonR3": 11,
}
let currentlyHeldGamepadKeybinds  = {
    "dpadUp": false,
    "dpadDown": false,
    "dpadLeft": false,
    "dpadRight": false,
    "buttonOptions": false,
    "buttonShare": false,
    "buttonSquare": false,
    "buttonTriangle": false,
    "buttonCancel": false,
    "buttonConfirm": false,
    "buttonL1": false,
    "buttonR1": false,
    "buttonL2": false,
    "buttonR2": false,
    "buttonL3": false,
    "buttonR3": false,
}



async function init() {
    createEventHandler('button-page-install-mods', 'click', () => {
        setTab('page-install-mods');
    });
    createEventHandler('button-page-mods-list', 'click', () => {
        setTab('page-mods-list');
    });
    createEventHandler('button-page-settings', 'click', () => {
        setTab('page-settings');
    });
}

// i18n support
window.api.on('i18n-ready', async () => {
    document.querySelectorAll('[data-i18n]').forEach(async elem => {
        const key = elem.getAttribute('data-i18n');
        const translation = await window.api.translate(key);
        elem.textContent = translation;
    });

    await init();
});

function setTab(tab) {
    console.log(`Setting tab to ${tab}`);
    document.querySelectorAll('.navbar-tab').forEach(elem => {
        elem.classList.remove('selected');
    });
    document.querySelectorAll('.page').forEach(elem => {
        elem.classList.remove('pageEnabled');
        elem.classList.add('pageDisabled');

        // Remove gamepad-selected-1 and gamepad-selected-2 classes from sub-elements
        elem.querySelectorAll('*').forEach(subElem => {
            subElem.classList.remove('gamepad-selected-1');
            subElem.classList.remove('gamepad-selected-2');
        });
    });
    document.querySelector(`#${tab}`).classList.add('pageEnabled');
    document.querySelector(`#${tab}`).classList.remove('pageDisabled');
    document.querySelector(`#button-${tab}`).classList.add('selected');
}

// Function to create an event handler
function createEventHandler(elementId, eventType, handlerFunction) {
    let element = document.getElementById(elementId);

    if (element) {
        // Add the event listener to the element
        element.addEventListener(eventType, handlerFunction);

        // Store the event handler in the object
        if (!eventHandlers[elementId]) {
            eventHandlers[elementId] = {};
        }
        eventHandlers[elementId][eventType] = handlerFunction;
    }
}

// Function to delete an event handler
function deleteEventHandler(elementId, eventType) {
    let element = document.getElementById(elementId);

    if (element) {
        // Remove the event listener from the element
        let handlerFunction = eventHandlers[elementId][eventType];
        if (handlerFunction) {
            element.removeEventListener(eventType, handlerFunction);

            // Remove the event handler from the object
            delete eventHandlers[elementId][eventType];
        }
    }
}

// Function to get an event handler
function getEventHandler(elementId, eventType) {
    if (eventHandlers[elementId] && eventHandlers[elementId][eventType]) {
        return eventHandlers[elementId][eventType];
    } else {
        return null;
    }
}

// Function to run an event handler
function runEventHandler(elementId, eventType) {
    let handlerFunction = getEventHandler(elementId, eventType);
    if (handlerFunction) {
        handlerFunction();
    }
}
