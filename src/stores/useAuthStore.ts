import { axiosInstance } from "@/lib/axios";
import { User } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface AuthStore {
	authUser: User | null,
	isSigningUp: boolean,
	isLoggingIn: boolean,
	isUpdatingProfile: boolean,
	isCheckingAuth: boolean,
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAuth: () => Promise<void>;
	signup: (data: any) => Promise<void>;
	login: (data: any) => Promise<void>;
	logout: () => Promise<void>;
	checkAdminStatus: () => Promise<void>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	authUser: null,	
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,
	isAdmin: false,
	isLoading: false,
	error: null,

	checkAuth: async () => {
		try {
		const res = await axiosInstance.get("/auth/check");

		set({ authUser: res.data });
		} catch (error) {
		console.log("Error in checkAuth:", error);
		set({ authUser: null });
		} finally {
		set({ isCheckingAuth: false });
		}
  	},

	signup: async (data: any) => {
		set({ isSigningUp: true });
		try {
		const res = await axiosInstance.post("/auth/signup", data);
		set({ authUser: res.data });
		toast.success("Account created successfully");
		} catch (error: any) {
		toast.error(error.response.data.message);
		} finally {
		set({ isSigningUp: false });
		}
	},

	login: async (data: any) => {
		set({ isLoggingIn: true });
		try {
		const res = await axiosInstance.post("/auth/login", data);
		set({ authUser: res.data });
		toast.success("Logged in successfully");
		} catch (error: any) {
		toast.error(error.response.data.message);
		} finally {
		set({ isLoggingIn: false });
		}
	},

  logout: async () => {
		try {
		await axiosInstance.post("/auth/logout");
		set({ authUser: null });
		toast.success("Logged out successfully");
		} catch (error: any) {
		toast.error(error.response.data.message);
		}
	},

  updateProfile: async (data: any) => {
		set({ isUpdatingProfile: true });
		try {
		const res = await axiosInstance.put("/auth/update-profile", data);
		set({ authUser: res.data });
		toast.success("Profile updated successfully");
		} catch (error: any) {
		console.log("error in update profile:", error);
		toast.error(error.response.data.message);
		} finally {
		set({ isUpdatingProfile: false });
		}
	},

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/admin/check");
			set({ isAdmin: response.data.admin });
		} catch (error: any) {
			set({ isAdmin: false, error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	reset: () => {
		set({ isAdmin: false, isLoading: false, error: null });
	},
}));
