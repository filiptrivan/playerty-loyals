import { BaseEntity } from "src/app/core/entities/base-entity";

export class SoftButton extends BaseEntity
{
    label?: string;
    icon?: string;
    onClick?: () => void;
  
    constructor(
    {
        label,
        icon,
        onClick,
    }:{
        label?: string;
        icon?: string;
        onClick?: () => void;
    } = {}
    ) {
        super('SoftButton');

        this.label = label;
        this.icon = icon;
        this.onClick = onClick;
    }
}