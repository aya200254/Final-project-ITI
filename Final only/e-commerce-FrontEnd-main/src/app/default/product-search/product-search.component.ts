import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit{
  serchRTxt: any;
  ProductsearchResults: any;
  constructor(private myActivated: ActivatedRoute, private _ProductService: ProductService){ }


  ngOnInit(): void {
    this.myActivated.params.subscribe(params => {
      this.serchRTxt= params['name'];
      this.getSearchedProduct()

    })
  }

  getSearchedProduct(){
    this._ProductService.filterByProduct(this.serchRTxt).subscribe({
      next: (item) => { this.ProductsearchResults = item ;  console.log(this.ProductsearchResults);
      },

      error: error => alert(error.message)
    })
  }

}
