class ApiError extends Error {
	data: Record<string, any> | null = null;
	success = false;

	constructor(
		public statusCode: number,
		public message: string = "Something went wrong",
		public errors: Error | string | string[] = []
	) {
		super(message);
		// Capture stack trace at the point where an object is created from this class
		if (!this.stack) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
