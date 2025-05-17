import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import UsersTable from "./UsersTable";

const UsersTabContent = () => {
	return (
		<Card className='bg-zinc-800/50 border-zinc-700/50'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='flex items-center gap-2'>
							<User className='h-5 w-5 text-cyan-500' />
							Users Database
						</CardTitle>
						<CardDescription>Manage your users</CardDescription>
					</div>
				</div>
			</CardHeader>

			<CardContent>
				<UsersTable/>
			</CardContent>
		</Card>
	);
};
export default UsersTabContent;
