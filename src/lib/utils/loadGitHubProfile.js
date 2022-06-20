import profile_placeholder from '@/lib/profile_placeholder'
import useSWR from 'swr'

export default async function loadGitHubProfile() {
	const headers = {
		Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
		'User-Agent': `skagur-k`,
	}
	const profile = await fetch(`https://api.github.com/users/skagur-k`, {
		headers,
	})
	if (!profile.ok) return profile_placeholder
	const data = await profile.json()
	return data
}
