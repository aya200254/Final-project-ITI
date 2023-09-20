import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders!:any[]
  orderStatus!: any
  constructor(private ordersSer: OrdersService){  }
  ngOnInit(): void {
    this.ordersSer.getAllOrders().subscribe({
      next:(res)=>{
        console.log(res);
        this.orderStatus = res.status
        console.log(this.orderStatus);
        
        this.allOrders = res.data
      }
    })
  }

}
