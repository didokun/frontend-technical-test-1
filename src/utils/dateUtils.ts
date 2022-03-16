export const strPad = (n: number)=> {
  return String("00" + n).slice(-2);
}

export const timestampToDateFormat = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const time = `${day} ${month} ${year} at ${strPad(hour)}:${strPad(min)}` ;
    return time;
}

export const timeSince = (date: number) => {
  const secondsAgo = Math.floor((Date.now()) / 1000 - date);
  const minute = 60;
  const hour = minute * 60;
  const day = hour*24;
  if (secondsAgo < day && secondsAgo >= hour) {
    return Math.floor(secondsAgo / hour) + " hours ago";
  }
  else if (secondsAgo < hour && secondsAgo >= minute) {
    return Math.floor(secondsAgo / minute) + " minutes ago";
  }
  else if (secondsAgo < minute) {
    return Math.floor(secondsAgo) + " seconds ago";
  }
  return timestampToDateFormat(date);
}