import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";



const UsersTable = () => {
	const { users, deleteUser, fetchUsers } = useMusicStore();

	const handleChange = async (id: string, newRole: string) => {
		// Call the API to update the role using the Axios instance
		try {
			await axiosInstance.patch(`/admin/users/${id}/role`, {
				role: newRole,
				headers: {
					'Content-Type': 'application/json',
				}
			});
			toast.success("Role updated successfully");
		} catch (error: any) {
			console.error('Error updating role:', error);
			toast.error("Failed to update role: " + error.message);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);


	return (
		<Table>
			<TableHeader>
				<TableRow className='hover:bg-zinc-800/50'>
					<TableHead className='w-[50px]'></TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Date Created</TableHead>
					<TableHead>Role</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user._id} className='hover:bg-zinc-800/50'>
						<TableCell>
							<img src={user.profileImage} alt={user.username} className='w-10 h-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium'>{user.username}</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{user.createdAt.split("T")[0]}
							</span>
						</TableCell>
						<TableCell>
							<Select
								onValueChange={(value) => handleChange(user._id, value)}
							>
								<SelectTrigger className='bg-zinc-800 border-zinc-700'>
									<SelectValue placeholder={user.role} />
								</SelectTrigger>
								<SelectContent className='bg-zinc-800 border-zinc-700'>
									<SelectItem value="user">user</SelectItem>
									<SelectItem value="admin">admin</SelectItem>
								</SelectContent>
							</Select>
						</TableCell>

						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() => {
										if (window.confirm(`Are you sure you want to delete "${user.username}"?`)) {
											deleteUser(user._id);
										}
									}}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
								>
									<Trash2 className='h-4 w-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default UsersTable;
