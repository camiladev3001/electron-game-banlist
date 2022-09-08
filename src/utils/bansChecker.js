export const cleanTextAndFindBanneds = (nicks, bans) => {
  const bannedsFound = []
  const pastedArray = nicks.split(' se unió a la sala')
  pastedArray.map(username => {
    const cleanedName = username.replace('\n', '')
    const banned = bans.data.find(ban => ban.nick === cleanedName)
    if(banned){ bannedsFound.push(banned) }
  })
  return bannedsFound
}

export const parseUnixToDateString = (unixValue) => {
  const dateObject = new Date(unixValue)
  const month = dateObject.toLocaleString("en-US", {month: "numeric"}) // December
  const day = dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
  const year = dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
  return `${day}/${month}/${year}`
}