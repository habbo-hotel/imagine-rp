import { Injectable } from "@nestjs/common";
import { CorporationEntity } from "../database/corporation.entity";
import { CorporationRepository } from "../database/corporation.repository";
import { Like } from "typeorm";

@Injectable()
export class GovernmentFacilityService {

    constructor(private readonly corporationRepo: CorporationRepository) { }

    async getWelfareCorp(): Promise<CorporationEntity> {
        return this.corporationRepo.findOneOrFail({
            tags: Like('%welfare%'),
        })
    }

}