import {api, headerApi} from "../config/axios";
import {IProducto, IProductoCreate} from "../interfaces/producto";

export class ProductoService {
        private apilistado = "/listado";
        private apiproducto = "/producto";
        private apicrear = "/crear";
        private apimodificar = "/modificar";
        private apieliminar = "/eliminar";
    
    public async getProductos(): Promise<IProducto[]> {
        try {
            const response = await api.get<IProducto[]>(this.apilistado);
            return response.data;
        } catch (error) {
            console.error("Error fetching productos:", error);
            throw error;
        }

    } 
    public async getProductoById(id: number): Promise<IProducto> {
        
        try {
            const response = await api.get<IProducto>(`${this.apiproducto}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching producto with id ${id}:`, error);
            throw error;
        }   
    }

    public async createProducto(producto: IProductoCreate): Promise<IProducto> {
        try {
            const response = await api.post<IProducto>(this.apicrear, producto, { headers: headerApi });
            return response.data;
        } catch (error) {
            console.error("Error creating producto:", error);
            throw error;
        }
    }
    public async updateProducto(id: number, producto: IProducto): Promise<IProducto> {
        try {
            const response = await api.put<IProducto>(`${this.apimodificar}/${id}`, producto, { headers: headerApi });
            return response.data;
        } catch (error) {
            console.error(`Error updating producto with id ${id}:`, error);
            throw error;
        }
        
    }   
public async deleteProducto(id: number): Promise<void> {
        try {
            await api.delete(`${this.apieliminar}/${id}`);
        } catch (error) {
            console.error(`Error deleting producto with id ${id}:`, error);
            throw error;
        }
    }   
}