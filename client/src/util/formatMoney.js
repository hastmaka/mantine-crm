export const formatMoney = (amount) => {
	// Ensure amount is a number
	const numericAmount = Number(amount);
	
	// Check if the input is a valid number
	if (isNaN(numericAmount)) {
		throw new Error('Invalid number');
	}
	
	// Use toLocaleString to format the number with commas
	return numericAmount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});
}