import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useState } from 'react';

interface AlertBoxProps {
	title: string;
	description: string;
	onConfirm?: () => void;
	triggerText?: string;
}

export const AlertBox = ({ title, description, onConfirm, triggerText = 'Show Alert' }: AlertBoxProps) => {
	const [open, setOpen] = useState(false);

	return (
		<AlertDialog.Root open={open} onOpenChange={setOpen}>
			<AlertDialog.Trigger asChild>
				<button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700" onClick={() => setOpen(true)}>
					{triggerText}
				</button>
			</AlertDialog.Trigger>

			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/50" />

				<AlertDialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md space-y-4">
					<AlertDialog.Title className="text-lg font-semibold text-gray-900">{title}</AlertDialog.Title>
					<AlertDialog.Description className="text-sm text-gray-600">{description}</AlertDialog.Description>

					<div className="flex justify-end gap-4">
						<AlertDialog.Cancel asChild>
							<button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" onClick={() => setOpen(false)}>
								Cancel
							</button>
						</AlertDialog.Cancel>

						<AlertDialog.Action asChild>
							<button
								className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
								onClick={() => {
									setOpen(false);
									onConfirm?.();
								}}
							>
								Confirm
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};
