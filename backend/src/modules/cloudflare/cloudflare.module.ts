import { Module } from '@nestjs/common';
import { R2Service } from './r2/r2.service';
import { StreamService } from './stream/stream.service';

@Module({
  providers: [R2Service, StreamService],
  exports: [R2Service, StreamService],
})
export class CloudflareModule {}
