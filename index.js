const gastos = document.getElementById('gasto');
const nombre = document.getElementById('nombre');
const add = document.getElementById('add');
const ul = document.getElementById('lista');
const pagoTotal = document.getElementById('total');
const pagaCd = document.getElementById('promedio');
let montos =[];

add.addEventListener('click',(e) => {
    e.preventDefault();

    const dinero = gastos.value;
    const persona = nombre.value;
    let suma = 0;

     if(dinero !== '' && persona !== '' && parseFloat(dinero) > 0){
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.className = "parrafo-li";
         p.textContent = `${persona} gastó $${dinero}`;
        //Suma del dinero
         montos.push(dinero);
         for(const monto of montos){
             suma += (parseFloat(monto));         
         }
         let promedio = suma / montos.length;
         
         Swal.fire({
            icon: 'success',
            title: 'Aquí está lo que deben pagar',
            text: `El total a pagar es de $${suma.toFixed(2)} y le corresponde a cada uno $${promedio.toFixed(2)}`,
            confirmButtonColor: "#518b00"
          });


         
         //Para añadirle el párrafo
        li.appendChild(p);
        //Le agregamos clases a los li
        li.className = "list-group-item";
        //Le agregamos el boton al li
        li.appendChild(addDeleteBtn());
        //Al ul le agregamos el li
        ul.appendChild(li);




        //Limpiar input  gastos
        gastos.value = '';
        //Limpiar input  nombre
        nombre.value = '';
     }else{
        Swal.fire({
            icon: 'error',
            title: 'No ha ingresado un nombre y/o monto',
            text: 'También puede ser que esté ingresando un valor no válido',
            confirmButtonColor: "#518b00"
          })
     }

});
function eliminarDelArray(lista, elemento){
    return lista.filter((l) => l !== elemento); /* Te quita un elemento del string */
}
function addDeleteBtn(){
    const eliminar = document.createElement('button');
    eliminar.textContent = "X";
    eliminar.className = "btn btn-danger btnDelete";

    eliminar.addEventListener('click',(e) => {
        const str = e.target.parentElement.children[0].innerHTML;
        const index = str.indexOf('$') + 1 ;
        const monto = str.substring(index, str.length);
        montos = eliminarDelArray(montos, monto);
        //Aquí agarramos el elemento de arriba, en este caso el li;
            const item = e.target.parentElement;
            ul.removeChild(item);

    });
    return eliminar;
}

