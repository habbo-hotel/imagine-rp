import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { GovernmentFacilityService } from "./facility.service";

@Module({
    imports: [DatabaseModule],
    providers: [GovernmentFacilityService],
    exports: [GovernmentFacilityService],
})
export class GovernmentModule { }