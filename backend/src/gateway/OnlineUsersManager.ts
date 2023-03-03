const SocketIDToUser = new Map<string, string>();
const UserToSocketID = new Map<string, string>();

export function addOnlineUser(socketID: string, user: string) {
	SocketIDToUser.set(socketID, user);
	UserToSocketID.set(user, socketID);
}

export function removeOnlineUser(socketID: string) {
	const user = SocketIDToUser.get(socketID);
	if (user) {
		UserToSocketID.delete(user);
		SocketIDToUser.delete(socketID);
	}

	return user;
}

export function getUserFromSocketID(socketID: string) {
	return SocketIDToUser.get(socketID);
}

export function checkIfUserOnline(user: string) {
	return UserToSocketID.get(user);
}
