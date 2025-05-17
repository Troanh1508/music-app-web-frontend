import { LayoutDashboardIcon, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
	const { isAdmin, logout, authUser } = useAuthStore();
	// console.log({ isAdmin });

	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
		>
			<div className='flex gap-2 items-center'>
				<img src='/spotify.png' className='size-8' alt='Spotify logo' />
				Spotify
			</div>
			<div className="flex items-center gap-2">
            
			<div className='flex items-center gap-4'>
			</div>
				{!authUser && (
					<>
					<Link to={"/signup"} className={cn(buttonVariants({ variant: "outline" }))}>
						<User className="size-5" />
						<span className="hidden sm:inline">Signup</span>
					</Link>

					<Link to={"/login"} className={cn(buttonVariants({ variant: "outline" }))}>
						<User className="size-5" />
						<span className="hidden sm:inline">Login</span>
					</Link>
					</>
				)}
			

            {authUser && (
              <>
			  	{isAdmin && (
					<Link to={"/admin"} className={cn(buttonVariants({ variant: "outline" }))}>
						<LayoutDashboardIcon className='size-4  mr-2' />
						Admin Dashboard
					</Link>
				)}

                <Link to={"/profile"} className={cn(buttonVariants({ variant: "outline" }))}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className={cn(buttonVariants({ variant: "outline" }))} onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
			
		</div>
	);
};
export default Topbar;
