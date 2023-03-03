import { useContext, useState, useEffect, createContext } from "react";
import config from "./Config";
import io, { Manager } from "socket.io-client";
import { useAuth } from "./AuthContext";

const GatewayContext = createContext();

export function useGateway() {
	return useContext(GatewayContext);
}

// const socket = io(CONFIG.URL, {
// 	transports: ["websocket", "polling", "flashsocket"],
// });

export function GatewayProvider({ children }) {
	const [socket, setSocket] = useState();

	const auth = useAuth();

	useEffect(() => {
		const currSocket = io(config.URL);
		setSocket(currSocket);
		window.socketIO = currSocket;

		currSocket.on("connect", () => {
			console.log("Connected to SocketIO");
		});

		currSocket.on("message", (message) => {
			console.log("Received Message: " + message);
		});

		currSocket.on("error", (message) => {
			console.error("Received Error Signal from Socket: " + message);
		});

	}, [])

	useEffect(() => {
		if(auth.currentUser)
		{
			auth.getToken().then((token) => {
				socket.emit("authentication", token);
			});
		}
	})

	const value = {
		socket
	};


	return (
		<GatewayContext.Provider value={value}>{children}</GatewayContext.Provider>
	);
}
