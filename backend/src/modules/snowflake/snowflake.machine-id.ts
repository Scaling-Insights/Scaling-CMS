import * as crypto from 'crypto';

/**
 * Function to generate a Snowflake ID based on pod name,
 * converting it to a numeric value that fits within the specified bit size.
 * @param podName - The name of the pod (string).
 * @param machineBits - The number of bits allocated for the machine ID.
 * @returns The numeric machine ID within the bit size.
 */
export default function generateSnowflakeIdFromPodName(podName: string, machineBits: number): number {
    // Generate a hash of the pod name using SHA-256
    const hash = crypto.createHash('sha256').update(podName).digest('hex');

    // Convert the hash to a numeric value
    const numericValue = BigInt(`0x${hash}`);

    // Calculate the maximum value for the machine ID based on the number of bits
    const maxValue = (1n << BigInt(machineBits)) - 1n; // Max value fitting in the machineBits

    // Truncate the numeric value to fit within the bit size
    const truncatedValue = numericValue % maxValue;

    // Return the numeric machine ID as a regular number
    return Number(truncatedValue);
}

// Example usage
// const podName = "pod-12345";
// const machineBits = 10;  // Typically, Snowflake uses 10 bits for machine ID
// const snowflakeMachineId = generateSnowflakeIdFromPodName(podName, machineBits);
// //console.log(snowflakeMachineId);