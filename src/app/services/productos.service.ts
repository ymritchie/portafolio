import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto [] = []
  cargando: boolean = true
  productosFiltrado: Producto[] =[]

  constructor( private http: HttpClient) {
    this.cargarProductos()
   }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-e99c8.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
       
        this.productos = resp
        this.cargando = false
        resolve();
      });


    })

    
  }

  getProducto (id: string){
    return this.http.get(`https://angular-html-e99c8.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino: string){
    if (this.productos.length === 0){
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino)
      })
    } else {
      this.filtrarProductos(termino)
    }

  }


  private filtrarProductos (termino: string){
    console.log(this.productosFiltrado)
    this.productosFiltrado = []

    this.productos.forEach(prod => {
      if (prod.categoria.toLocaleLowerCase().indexOf(termino.toLocaleLowerCase()) >= 0 || prod.titulo.toLocaleLowerCase().indexOf(termino.toLocaleLowerCase()) >= 0){
        this.productosFiltrado.push(prod)
      }
    })
    
  }

}
