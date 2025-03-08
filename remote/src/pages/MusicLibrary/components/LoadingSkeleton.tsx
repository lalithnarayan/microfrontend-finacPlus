export const LoadingSkeleton = () => {
	return (
		<div className="space-y-8">
			{Array.from({ length: 3 }).map((_, groupIndex) => (
				<div key={groupIndex} className="bg-white p-4 rounded-lg shadow">
					<div className="h-6 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{Array.from({ length: 10 }).map((_, index) => (
							<div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg animate-pulse">
								<div className="w-full h-40 bg-gray-600 rounded-md mb-2"></div>
								<div className="h-4 bg-gray-500 rounded w-3/4 mb-1"></div>
								<div className="h-3 bg-gray-400 rounded w-1/2 mb-1"></div>
								<div className="h-3 bg-gray-500 rounded w-2/3"></div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default LoadingSkeleton;
