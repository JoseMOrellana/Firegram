export const timeAgo = (date) => {
    var delta = Math.round((+new Date() - date) / 1000);
    var minute = 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;

    if (delta < 30) {
        return "just then.";
    }
    if (delta < minute) {
        return delta + " seconds ago.";
    }
    if (delta < 2 * minute) {
        return "a minute ago.";
    }
    if (delta < hour) {
        return Math.floor(delta / minute) + " minutes ago.";
    }
    if (Math.floor(delta / hour) === 1) {
        return "1 hour ago.";
    }
    if (delta < day) {
        return Math.floor(delta / hour) + " hours ago.";
    }
    if (delta < day * 2) {
        return "yesterday";
    }
    if (delta < week) {
        return Math.floor(delta / day) + " days ago.";
    }
    if (delta > week) {
        return Math.floor(delta / week) + " weeks ago.";
    }
};
