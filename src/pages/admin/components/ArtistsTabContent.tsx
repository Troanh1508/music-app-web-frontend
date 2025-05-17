import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicVocal } from "lucide-react";
import ArtistsTable from "./ArtistsTable";
import AddArtistDialog from "./AddArtistDialog";

const ArtistsTabContent = () => {
	return (
		<Card className='bg-zinc-800/50 border-zinc-700/50'>
			<CardHeader>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='flex items-center gap-2'>
							<MicVocal className='h-5 w-5 text-orange-500' />
							Artists Collection
						</CardTitle>
						<CardDescription>Manage your artists</CardDescription>
					</div>
					<AddArtistDialog />
				</div>
			</CardHeader>

			<CardContent>
				<ArtistsTable />
			</CardContent>
		</Card>
	);
};
export default ArtistsTabContent;
