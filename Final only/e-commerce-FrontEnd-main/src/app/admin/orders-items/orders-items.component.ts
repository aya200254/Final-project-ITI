import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders-items',
  templateUrl: './orders-items.component.html',
  styleUrls: ['./orders-items.component.css']
})
export class OrdersItemsComponent implements OnInit{
  ordersItems!: any[]
  orderStatus!: any
  constructor(private ordersItemsSer:OrdersService){  }
  ngOnInit(): void {
    this.ordersItemsSer.getAllOrdersItems().subscribe({
      next:(res)=>{
        this.ordersItems = res.data
        this.orderStatus = res.status        
      }
    })
  }
}
