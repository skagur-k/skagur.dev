export default async function loadGitHubProfile() {
	const headers = {
		Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
		'User-Agent': `skagur-k`,
	}

	const profile = await fetch(`https://api.github.com/users/skagur-k`, {
		headers,
	})

	const profilemeta = await profile.json()
	return profilemeta
}
