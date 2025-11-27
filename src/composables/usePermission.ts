interface Role {
	id: string
	name: string
	permissions: Permission[]
}

interface Permission {
	id: string
	name: string
	description: string
}

interface User {
	name: string
	roles?: Role[]
	permissions?: Permission[]
}

const currentUser: User = {
	name: 'Mashiyyat',
	roles: [
		{
			id: '1',
			name: 'Admin',
			permissions: [
				{ id: '1', name: 'create-post', description: 'Can create posts' },
				{ id: '2', name: 'update-post', description: 'Can update posts' },
				{ id: '3', name: 'delete-post', description: 'Can delete posts' },
			],
		},
		{
			id: '2',
			name: 'Branch Manager',
			permissions: [
				{ id: '1', name: 'create-branch', description: 'Can create branches' },
				{ id: '2', name: 'update-branch', description: 'Can update branches' },
				{ id: '3', name: 'delete-branch', description: 'Can delete posts' },
			],
		},
	],
	permissions: [
		{ id: '1', name: 'create-user', description: 'Can create users' },
		{ id: '2', name: 'update-user', description: 'Can update users' },
		{ id: '3', name: 'delete-user', description: 'Can delete posts' },
	],
}

export default function usePolicy(policyName: string | string[]) {
	const rolePermissions =
		currentUser.roles?.flatMap((role) => role.permissions?.map((perm) => perm.name) ?? []) ?? []

	const userPermissions = currentUser.permissions?.map((p) => p.name) ?? []
	const allPermissions = [...new Set([...rolePermissions, ...userPermissions])]

	const can = (policy: string | string[]) =>
		Array.isArray(policy)
			? policy.some((p) => allPermissions.includes(p))
			: allPermissions.includes(policy)

	const allowed = can(policyName)

	return {
		allowed,
		can,
	}
}
