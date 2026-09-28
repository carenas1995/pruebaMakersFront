export interface Prestamo {
  id?: number;
  monto?: number;
  usuarioEmail?: string;
  plazoMeses?: number;
  estado?: string;
  montoTotal?: number;
  fechaCreacion?: Date;
}

export interface PrestamoRequestDTO {
  amount: number;
  termMonths?: number;
}

export interface PrestamoResponseDTO {
  id: number;
  username: string;
  monto: number;
  termMonths: number;
  status: string;
  createdAt?: string;
}