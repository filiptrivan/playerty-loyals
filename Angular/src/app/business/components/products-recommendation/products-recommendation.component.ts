import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { Product } from '../../entities/business-entities.generated';

@Component({
    selector: 'products-recommendation',
    templateUrl: './products-recommendation.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    TranslocoDirective,
]
})
export class ProductsRecommendationComponent {
    productList: Product[] = [];

    constructor(
        private apiService: ApiService
        ) {

        }

    ngOnInit(){
        this.apiService.getProductListForRecommendation().subscribe((productList) => {
            this.productList = productList;
        })
    }

}