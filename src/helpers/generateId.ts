export const generateID = () => {
  const newDate = new Date().getTime()
  const numRandom = Math.floor(Math.random() * 8)
  const id = (newDate + numRandom).toFixed()
  return id
}
