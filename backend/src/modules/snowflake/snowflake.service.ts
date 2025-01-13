import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Snowflake } from 'nodejs-snowflake';
import { Timestamp } from 'typeorm';
import generateSnowflakeIdFromPodName from './snowflake.machine-id';

@Injectable()
export class SnowflakeService {
    private snowflake: Snowflake;
    private podName: string;

    private config : {custom_epoch: number, instance_id: number};

    constructor(
        private readonly configService : ConfigService
    ) {
        this.snowflake = new Snowflake(this.config);
        this.config = {
            custom_epoch: Date.now(),
            instance_id: generateSnowflakeIdFromPodName(this.configService.get<string>('POD_NAME')!, 10)
        }
    }

    generateId(): BigInt {
        return this.snowflake.getUniqueID();
    }

    getTimestamp(uid: BigInt): number {
        return Snowflake.timestampFromID(uid, this.config.custom_epoch);
    }

    getMachineIdFromId(uid : any): number {
        return Snowflake.instanceIDFromID(uid);
    }

    getMachineId(): number {
        return this.config.instance_id;
    }

    toBigInt(id: string): bigint {
        return BigInt(id);
    }
}
