
export function setEvent(eventName, eventElement, eventFunction) {
    if (setEvent.activeEvents == undefined) {
        setEvent.activeEvents = [];
    }
    eventElement.addEventListener(eventName, eventFunction);
    setEvent.activeEvents.push([eventElement, eventFunction]);
}

export function removeEvents() {
    for (let i = 0; i < setEvent.activeEvents.length; i++) {
        let eventElement = setEvent.activeEvents[i][0];
        let eventFunction = setEvent.activeEvents[i][1];
        eventElement.removeEventListener('click', eventFunction);
        eventElement.removeEventListener('change', eventFunction);
    }
    setEvent.activeEvents = [];
}