export type ContasCasa = {
    id: number,
    mes: string,
    piscina: number,
    faxineira: number,
    internet: number,
    guarda: number,
    luz: number,
    agua: number,
    extra_iptu: number,
    caixinha: number,
    pago: boolean,
}

export type Morador = {
    id: number,
    nome: string,
}

export type ContaExtra = {
    id: number,
    data: string, 
    dono: Morador,
    valor: number,
    descricao: string,
}