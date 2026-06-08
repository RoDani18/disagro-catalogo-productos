export interface IProducto {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    categorias: string;
    stock: number;
}

export interface IProductoCreate {
    codigo: string; 
    nombre: string;
    descripcion: string;
    precio: number;
    categorias: string;
    stock: number;
}   

