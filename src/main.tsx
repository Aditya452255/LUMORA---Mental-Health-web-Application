
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from './hooks/useAuth';
import { startLiteParticles } from './utils/particles';

function RootApp() {
	useEffect(() => {
		// start lightweight particles and cleanup on unmount
		const stop = startLiteParticles();
		return () => stop();
	}, []);

	return (
		<AuthProvider>
			<div className="content-root app-shell">
				<App />
			</div>
		</AuthProvider>
	);
}

createRoot(document.getElementById("root")!).render(<RootApp />);
