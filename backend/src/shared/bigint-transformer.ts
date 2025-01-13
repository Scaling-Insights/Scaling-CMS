export class ColumnBigIntTransformer {
    public to(value: string | bigint): bigint {
        // Converts a string or bigint from the application to bigint for storage
        return typeof value === 'string' ? BigInt(value) : value;
    }

    public from(value: bigint): string | bigint {
        // Converts bigint from the database to string for application use
        return value !== null && value !== undefined ? value.toString() : value;
        // return value.toString();
    }
}