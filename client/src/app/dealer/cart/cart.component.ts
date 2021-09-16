import { Position } from '@angular/compiler'
import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { CartPositions, Order } from 'src/app/shared/interfaces'
import { PositionService } from 'src/app/shared/services/position.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(public positionServices: PositionService) {}
  // cartPositionCount: CartPositions[] = [];
  displayedColumns: string[] = ['position', 'name', 'count', 'price', 'summ']
  dataSource: MatTableDataSource<CartPositions>
  cartProducts: CartPositions[] = []
  totalPrice: number = 0

  ngOnInit(): void {
    this.cartProducts = this.positionServices.cartPositions
    console.log(this.cartProducts)
    this.dataSource = new MatTableDataSource(this.cartProducts)
  }

  onSubmit() {
    this.cartProducts = this.positionServices.cartPositions
    this.totalPrice = this.positionServices.totalPrice
    /*   const order = {
      orders: this.cartProducts,
      price: this.productServis.totalPrice,
      date: new Date()
    }
    this.orderServis.create(order).subscribe(res => {
      console.log(res )
      this.added = 'Delivery is framed'
      this.submitted = false
      this.cartProducts.length = 0
    }) */
  }

  delete(product: CartPositions) {
    this.positionServices.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }

  plusCount(product: CartPositions) {
    const cartElementIndex = this.cartProducts.findIndex(
      (cartProduct) => cartProduct.id == product.id
    )
    console.log(this.cartProducts)
    console.log(product)
    console.log(cartElementIndex)
    this.cartProducts[cartElementIndex].count += +1
    this.positionServices.totalPrice += +product.price
  }

  minusCount(product: CartPositions) {
    const cartElementIndex = this.cartProducts.findIndex(
      (cartProduct) => cartProduct.id == product.id
    )

    if (this.cartProducts[cartElementIndex].count > 1) {
      this.positionServices.totalPrice -= +product.price
      this.cartProducts[cartElementIndex].count -= +1
    } else {
      this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
    }
  }

  clearCart() {
    this.cartProducts.length = 0
  }
}
