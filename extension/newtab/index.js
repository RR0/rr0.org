const todayTimeEl = document.querySelector("#today-time time")

function displayDate () {
  todayTimeEl.textContent = new Date().toLocaleString(navigator.language, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

setInterval(() => displayDate(), 60 * 1000)
displayDate()

const username = "r_r_0"
fetch(`https://api.twitter.com/2/users/by/${username}/tweets`).then(async (response) => {
  const tweets = await response.json()
  console.log(tweets)
})
