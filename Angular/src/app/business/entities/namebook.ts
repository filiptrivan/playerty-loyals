import { BaseEntity } from "src/app/core/entities/base-entity";

// FT HACK: Fake class, because of api imports
export class Namebook extends BaseEntity
{
    id?: number;
    displayName?: string;
  
    constructor(
    {
        id,
        displayName,
    }:{
        id?: number;
        displayName?: string;
    } = {}
    ) {
        super('Namebook');

        this.id = id;
        this.displayName = displayName;
    }
}