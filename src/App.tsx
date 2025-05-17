import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import FavoritePage from "./pages/favorite/FavoritePage";
import ArtistPage from "./pages/artist/ArtistPage";

function App() {

	const { authUser, checkAuth, isCheckingAuth} = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// console.log({ authUser });

	if (isCheckingAuth && !authUser)
		return (
		<div className="flex items-center justify-center h-screen">
			<Loader className="size-10 animate-spin" />
		</div>
		);

	return (
		<>
			<Routes>

				<Route path='/admin' element={<AdminPage />} />
				<Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
    		    <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
				

				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/albums/:albumId' element={<AlbumPage />} />
					<Route path='/artists/:artistId' element={<ArtistPage />} />	
					<Route path="/favorites/:user" element={<FavoritePage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
