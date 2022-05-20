import { useState, useContext, createContext } from 'react'

const ProfileContext = createContext()
const ProfileUpdateContext = createContext()

export function useProfile() {
	return useContext(ProfileContext)
}

export function useSetProfile() {
	return useContext(ProfileUpdateContext)
}

export function ProfileProvider({ children }) {
	const [data, setData] = useState(null)

	function setProfile(profiledata) {
		if (data != null) return
		setData(profiledata)
	}

	return (
		<ProfileContext.Provider value={data}>
			<ProfileUpdateContext.Provider value={setProfile}>
				{children}
			</ProfileUpdateContext.Provider>
		</ProfileContext.Provider>
	)
}
