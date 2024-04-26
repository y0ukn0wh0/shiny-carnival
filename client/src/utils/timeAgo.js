export function timeAgo(time, justNow) {
  if (typeof time === "object" && time instanceof Date) {
    time = time.getTime() / 1000;
  } else if (typeof time === "number") {
    time = new Date(time * 1000).toLocaleString();
  }
  if (isNaN(Date.parse(time))) {
    time = new Date().toLocaleString();
  }
  let interval = Math.floor((new Date() - new Date(time)) / 1000);
  let adjective = new Date(time) > new Date() ? "from now" : "ago";
  let days = Math.floor(interval / (60 * 60 * 24));
  let hours = Math.floor(interval / (60 * 60));
  let minutes = Math.floor(interval / 60);

  if (days > 0) {
    return new Date(time).toLocaleString();
  } else {
    if (hours < 1 && minutes < 1 && justNow) {
      return "just now";
    } else if (hours > 1) {
      return hours + " hour" + (hours > 1 ? "s" : "") + " ago";
    } else {
      return minutes + " minute" + (minutes > 1 ? "s" : "") + " " + adjective;
    }
  }
}
