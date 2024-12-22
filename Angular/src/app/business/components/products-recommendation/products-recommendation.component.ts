import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { ApiService } from '../../services/api/api.service';
import { Product } from '../../entities/generated/business-entities.generated';
import { TranslocoDirective } from '@jsverse/transloco';

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
    products: Product[] = [];

    constructor(
        private apiService: ApiService
        ) {

        }

    ngOnInit(){
        this.apiService.getProductsForTheRecommendation().subscribe((products) => {
            this.products = products;
        })
    }

}