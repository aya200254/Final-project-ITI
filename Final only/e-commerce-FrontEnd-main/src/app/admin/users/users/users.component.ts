import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit{
  allUsers!:any[]
  constructor(private userSer:UsersService){  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    console.log(this.allUsers);
    this.userSer.getAllUsers().subscribe({
      next:(res)=>{
        // this.allUsers = res
        if (this.allUsers === undefined) {
          this.allUsers = res['data'];
          console.log("res" , this.allUsers);
        } else {
          // this.allUsers = this.allUsers.concat(res['data']);
        }
      }
    })
    
  }
  
}
