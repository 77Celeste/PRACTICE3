var calcular = function(cargar){
  this.items = cargar.items || {};
  this.cantidadTotal = cargar.cantidadTotal || 0;
  this.precioTotal = cargar.precioTotal || 0;
  //this.totalStock = oldCart.totalStock || 0;

  this.add = function(item, id) {
      var storedItem = this.items[id];
      if (!storedItem) {
        //  storedItem = this.items[id] = {item: item, stock:0, qty: 0, precio: 0};
          storedItem=this.items[id]={item: item, cantidad: 0, precio: 0};
      }
      /*storedItem.item.stock--;
      storedItem.stock = storedItem.item.stock;*/
      storedItem.cantidad++;
      storedItem.precio = storedItem.item.precio * storedItem.cantidad;
      this.cantidadTotal++;
      this.precioTotal += storedItem.item.precio;

  };
  this.generateArray = function() {
      var arr = [];
      for (var id in this.items) {
          arr.push(this.items[id]);
      }
      return arr;
  };
}

module.exports = calcular;
