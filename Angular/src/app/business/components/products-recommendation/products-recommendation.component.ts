import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective } from '@jsverse/transloco';
import { Product } from '../../entities/business-entities.generated';
import { PrimengModule } from '@playerty/spider';

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
    loading = true;

    constructor(
        private apiService: ApiService
        ) {

        }

    ngOnInit(){
        this.apiService.getProductListForRecommendation().subscribe((products) => {
            this.products = products;
            this.loading = false;
        })
    }

}