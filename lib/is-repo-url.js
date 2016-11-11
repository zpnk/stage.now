export default (url) => {
  const githubRepo = /^https?:\/\/(www\.)?github\.com\/[a-zA-z0-9-.]+\/[a-zA-z0-9-.]+\/?$/

  return githubRepo.test(url)
}
