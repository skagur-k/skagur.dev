export type GitHubData = {
	login: string
	avatar_url: string
	url: string
	html_url: string
	name: string
	company: string | null
	blog: string | null
	location: string | null
	email: string | null
	hireable: boolean | null
	bio: string | null
}

export type Views = {
	total: number
}
