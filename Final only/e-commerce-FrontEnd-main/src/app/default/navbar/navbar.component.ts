import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public loggedIn!: boolean;
  public categories: any = [];
  searchText= ""
  public user: any
  public discounts: any = [];
  public filteredCategories: any = [];
  public cartItems:any = 0;
  notifierSubscription: Subscription =
  this.productService.cartNotifier.subscribe((notified) => {
   this.cartItems = notified;
  });

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private productService: ProductService,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.authService.authStatus.subscribe((value) => {
      this.loggedIn = value
      this.loginService.user  =  { user: JSON.parse(localStorage.getItem('user')|| "") }
      this.user =JSON.parse(localStorage.getItem('user')|| "") 
    });
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      if(localStorage.getItem('session')){
        this.loginService.session = JSON.parse(localStorage.getItem('session')|| "")
        this.loginService.user = { user: JSON.parse(localStorage.getItem('user')|| "") }
        this.user = JSON.parse(localStorage.getItem('user' )|| '')
      }
    }
    this.onGetCategories();
  }

  logout(event: any) {
    this.tokenService.delete();
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    this.loginService.user = undefined
    this.authService.changeAuthStatus(false);
    this.tokenService.validLoggedIn = false;
    this.cartItems = 0
    this.router.navigateByUrl('/login');
  }

  onGetCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response['data'];
        this.filteredCategories = response['data'];
      },
      error: (error: any) => {
        console.log(error.message);
      },
    });
  }


  valueSelected(categoryId: any, categoryName: any) {
    this.router.navigateByUrl(
      `/categories/${categoryId}/${categoryName}/page/1`
    );
    this.productService.notifyAboutChange({ categoryId, categoryName });
  }
  searchProduct(seerchTxt: string) {
    this.router.navigateByUrl(`products/search/${seerchTxt}`);
  }
  
}
