
import { useAuthStore } from "@/stores/useAuthStore";
import { useActivityStore } from "@/stores/useActivityStore";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [loading, setLoading] = useState(true);
	const { authUser ,checkAdminStatus } = useAuthStore();
	const { initSocket, disconnectSocket } = useActivityStore();

	useEffect(() => {
		const initAuth = async () => {
			try {
				if (authUser) {
					await checkAdminStatus();
					// init socket
					if (authUser._id) initSocket(authUser._id);
				}
			} catch (error: any) {
				console.log("Error in auth provider", error);
			} finally {
				setLoading(false);
			}
		};

		initAuth();

		// clean up
		return () => disconnectSocket();
	}, [ authUser,checkAdminStatus, initSocket, disconnectSocket]);

	if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		);

	return <>{children}</>;
};
export default AuthProvider;
